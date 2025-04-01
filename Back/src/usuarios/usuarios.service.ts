import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  // Registrar un nuevo usuario
  async createUser(usuario: Partial<Usuario>): Promise<Usuario> {
    const existingUser = await this.usuariosRepository.findOne({ where: { email: usuario.email } });
    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está en uso');
    }
    const newUser = this.usuariosRepository.create(usuario);
    return this.usuariosRepository.save(newUser);
  }

  // Obtener un usuario por email
  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { email } });
  }

  // Actualizar un usuario
  async updateUser(id: number, updates: Partial<Usuario>): Promise<Usuario> {
    try {
      const user = await this.usuariosRepository.findOneOrFail({ where: { id } });
      await this.usuariosRepository.update(id, updates);
      return this.usuariosRepository.findOne({ where: { id } });
    } catch (error) {
      if (error.name === 'EntityNotFound') {
        throw new NotFoundException('Usuario no encontrado');
      }
      throw error; // Si es otro tipo de error, lo lanzamos nuevamente
    }
  }
}

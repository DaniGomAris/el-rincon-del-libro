import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
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
    const user = await this.usuariosRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    await this.usuariosRepository.update(id, updates);
    return this.usuariosRepository.findOne({ where: { id } });
  }
}

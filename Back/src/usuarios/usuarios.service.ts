import { Injectable } from '@nestjs/common';
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
    return this.usuariosRepository.save(usuario);
  }

  // Obtener un usuario por email
  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { email } });
  }

  // Actualizar un usuario
  async updateUser(id: number, updates: Partial<Usuario>): Promise<Usuario> {
    await this.usuariosRepository.update(id, updates);
    return this.usuariosRepository.findOne({ where: { id } });
  }
}

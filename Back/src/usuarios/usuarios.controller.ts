import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../entities/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Ruta para registrar un nuevo usuario
  @Post('register')
  async register(@Body() userData: Partial<Usuario>) {
    return this.usuariosService.createUser(userData);
  }

  // Ruta para obtener usuario por correo
  @Get(':email')
  async getByEmail(@Param('email') email: string) {
    return this.usuariosService.findByEmail(email);
  }

  // Ruta para actualizar datos del usuario
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updates: Partial<Usuario>) {
    return this.usuariosService.updateUser(id, updates);
  }
}

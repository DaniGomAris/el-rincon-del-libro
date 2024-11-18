import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { HeaderComponent } from "../../../layout/pages/header/header.component";
import { FooterComponent } from "../../../layout/pages/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-informacion-perfil',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './informacion-perfil.component.html',
  styleUrls: ['./informacion-perfil.component.css']
})
export class InformacionPerfilComponent implements OnInit {
  nombre: string | null = '';
  apellido: string | null = '';
  email: string | null = '';

  constructor(private UsuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.nombre = user.nombre;
      this.apellido = user.apellido;
      this.email = user.email;
    }
  }
}

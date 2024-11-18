// sign-in.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../layout/pages/header/header.component';
import { FooterComponent } from '../../../layout/pages/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, RouterModule, HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  onLogin(): void {
    this.usuarioService.login(this.email, this.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = 'Correo o contraseña incorrectos';
        console.error('Error en el login:', error);
      }
    );
  }
}

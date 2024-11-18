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
  imports: [FormsModule, RouterModule, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  onLogin(): void {
    this.loading = true;
    this.errorMessage = '';

    this.usuarioService.login(this.email, this.password).subscribe(
      (response) => {
        this.loading = false;
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.loading = false;
        if (error.status === 401) {
          this.errorMessage = 'Correo o contraseña incorrectos';
        } else {
          this.errorMessage = 'Hubo un problema con la conexión, por favor intenta nuevamente';
        }
        console.error('Error en el login:', error);
      }
    );
  }
}


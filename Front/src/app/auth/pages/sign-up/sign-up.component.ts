import { Component } from '@angular/core';
import { FooterComponent } from "../../../layout/pages/footer/footer.component";
import { HeaderComponent } from "../../../layout/pages/header/header.component";
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  registerForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegister() {
    console.log('Formulario enviado');
    if (this.registerForm.valid) {
      const { nombre, apellido, email, password } = this.registerForm.value;
  
      console.log('Datos del formulario:', { nombre, apellido, email, password });
  
      this.usuarioService.register(nombre, apellido, email, password).subscribe({
        next: (response) => {
          console.log('Usuario registrado exitosamente:', response);
          this.router.navigate(['/sign-in']);
        },
        error: (error) => {
          console.error('Error al registrar usuario:', error);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
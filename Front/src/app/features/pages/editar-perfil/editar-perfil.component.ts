import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../layout/pages/header/header.component";
import { FooterComponent } from "../../../layout/pages/footer/footer.component";

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  profileForm: FormGroup;
  user: any = null;

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    if (!this.usuarioService.isLoggedIn()) {
      this.router.navigate(['/sign-in']);
      return;
    }

    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.profileForm.patchValue({
        nombre: this.user.nombre || '',
        apellido: this.user.apellido || '',
        email: this.user.email || ''
      });
    }
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      alert("Por favor, completa correctamente los campos.");
      return;
    }

    const { nombre, apellido, email, password } = this.profileForm.value;
    const token = this.user?.token;

    this.usuarioService.updateUser(nombre, apellido, email, password, token).subscribe({
      next: () => {
        alert('Perfil actualizado con éxito!');
        this.router.navigate(['/informacion-perfil']);
      },
      error: (err) => {
        console.error('Error al actualizar perfil', err);
        alert('Hubo un error al actualizar los datos.');
      }
    });
  }
}

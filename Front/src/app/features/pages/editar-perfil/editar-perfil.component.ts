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
  user: any;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    if (this.usuarioService.isLoggedIn()) {
      const userData = JSON.parse(localStorage.getItem('user')!);
      this.user = userData;

      this.profileForm.patchValue({
        nombre: this.user.nombre,
        apellido: this.user.apellido,
        email: this.user.email,
        password: ''
      });
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  updateProfile() {
    if (this.profileForm.valid) {
      const { nombre, apellido, email, password } = this.profileForm.value;
      const token = this.user.token;

      this.usuarioService.updateUser(nombre, apellido, email, password, token).subscribe({
        next: (response) => {
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
}

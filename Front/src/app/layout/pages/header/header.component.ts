import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../../services/libro.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';  // Importar Router

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  libros: any[] = [];
  tituloBusqueda: string = '';
  resultadosVisible: boolean = false;
  sesionMenuVisible: boolean = false;
  usuarioLogueado: string | null = null;

  constructor(
    private libroService: LibroService,
    private usuarioService: UsuarioService,
    private router: Router  // Inyectar Router para navegación
  ) {}

  ngOnInit(): void {
    // Verifica si el usuario está logueado al cargar el componente
    this.usuarioLogueado = this.usuarioService.getUsername();
  }

  buscarLibros(): void {
    if (this.tituloBusqueda.trim()) {
      this.libroService.buscarLibros(this.tituloBusqueda).subscribe(response => {
        this.libros = response.docs;
        this.resultadosVisible = this.libros.length > 0;
      });
    }
  }

  // Redirigir al usuario a la página de información del libro cuando hace clic en un libro
  irAInformacionLibro(libroId: string): void {
    const libroSeleccionado = this.libros.find(libro => libro.key === libroId);
  
    if (libroSeleccionado) {
      // Pasar el libro y el precio (esto puede ser de una fuente como un servicio o una API)
      this.router.navigate(['/informacion-libro', libroId], {
        state: {
          libro: libroSeleccionado,
          precio: 20 // Aquí puedes calcular el precio de manera dinámica si es necesario
        }
      });
    }
  }

  toggleSesionMenu(): void {
    this.sesionMenuVisible = !this.sesionMenuVisible;
  }

  // Cerrar sesión
  cerrarSesion(): void {
    this.usuarioService.logout();
    this.usuarioLogueado = null;  // Actualiza el estado de usuario logueado
    this.sesionMenuVisible = false;
  }

  @HostListener('document:click', ['$event'])
  oneClickOutside(event: MouseEvent): void {
    const sesionMenu = document.querySelector('.sesion-menu');
    if (sesionMenu && !sesionMenu.contains(event.target as Node)) {
      this.sesionMenuVisible = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const searchBar = document.querySelector('.search-bar');
    const resultados = document.querySelector('.resultados-libros');
    
    if (searchBar && !searchBar.contains(event.target as Node) &&
      resultados && !resultados.contains(event.target as Node)) {
      this.resultadosVisible = false;
    }
  }
}

import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../../services/libro.service';
import { UsuarioService } from '../../../services/usuario.service';

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
    private readonly libroService: LibroService,
    private readonly usuarioService: UsuarioService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
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

  irAInformacionLibro(libroId: string): void {
    const libroSeleccionado = this.libros.find(libro => libro.key === libroId);
    if (!libroSeleccionado) return;

    this.router.navigate(['/informacion-libro', libroId], {
      state: { libro: libroSeleccionado, precio: 20 }
    });
    this.resultadosVisible = false; // Ocultar resultados después de la selección
  }

  toggleSesionMenu(): void {
    this.sesionMenuVisible = !this.sesionMenuVisible;
  }

  cerrarSesion(): void {
    this.usuarioService.logout();
    this.usuarioLogueado = null;
    this.sesionMenuVisible = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as Node;
    const sesionMenu = document.querySelector('.sesion-menu');
    const searchBar = document.querySelector('.search-bar');
    const resultados = document.querySelector('.resultados-libros');

    if (sesionMenu && !sesionMenu.contains(target)) {
      this.sesionMenuVisible = false;
    }

    if (searchBar && !searchBar.contains(target) && resultados && !resultados.contains(target)) {
      this.resultadosVisible = false;
    }
  }
}

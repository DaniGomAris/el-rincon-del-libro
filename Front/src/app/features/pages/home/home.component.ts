import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../layout/pages/header/header.component";
import { FooterComponent } from "../../../layout/pages/footer/footer.component";
import { RouterModule } from '@angular/router';
import { LibroService } from "../../../services/libro.service";
import { CommonModule } from '@angular/common';
import { CartService } from "../../../services/cart.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  libros: any[] = [];
  librosAleatorios: any[] = [];
  generos: string[] = [
    'accion', 'ficcion', 'misterio', 'ciencia_ficcion', 'fantasia', 'biografia',
    'romantica', 'historia', 'desarrollo_personal', 'terror', 'aventura', 'comedia',
    'drama', 'romance', 'thriller', 'suspenso', 'policiaca', 'autoayuda', 'poesia',
    'cultura', 'espionaje', 'joven_adulto', 'literatura_clasica', 'humor',
    'literatura_infantil', 'historia_real', 'ensayo', 'ficcion_historica',
    'literatura_contemporanea'
  ];
  generosAleatorios: string[] = [];
  precios: Map<string, number> = new Map();
  generoSeleccionado: string = '';

  constructor(
    private readonly libroService: LibroService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.generarGenerosAleatorios();
    const generoAleatorio = this.obtenerGeneroAleatorio();
    this.cargarLibrosPorGenero(generoAleatorio);
  }

  private generarGenerosAleatorios(): void {
    this.generosAleatorios = [...new Set(this.generos.sort(() => Math.random() - 0.5).slice(0, 10))];
  }

  private obtenerGeneroAleatorio(): string {
    return this.generos[Math.floor(Math.random() * this.generos.length)];
  }

  filtrarPorGenero(genero: string): void {
    this.generoSeleccionado = genero;
    this.cargarLibrosPorGenero(genero);
  }

  private cargarLibrosPorGenero(genero: string): void {
    this.libroService.buscarLibros(genero).subscribe((response: any) => {
      this.libros = response.docs.slice(0, 30);
      this.asignarPrecios();
      this.mostrarLibrosAleatorios();
    });
  }

  private asignarPrecios(): void {
    this.precios.clear();
    this.libros.forEach(libro => {
      this.precios.set(libro.key, Math.floor(Math.random() * (100 - 5 + 1)) + 5);
    });
  }

  obtenerPrecio(libro: any): number {
    return this.precios.get(libro.key) || 32;
  }

  private mostrarLibrosAleatorios(): void {
    this.librosAleatorios = [...this.libros].sort(() => Math.random() - 0.5).slice(0, 10);
  }

  agregarAlCarrito(libro: any): void {
    const precio = this.obtenerPrecio(libro);
    const libroConPrecio = { ...libro, precio };
    this.cartService.agregarAlCarrito(libroConPrecio);
    alert(`${libro.title} ha sido añadido al carrito.`);
  }
}

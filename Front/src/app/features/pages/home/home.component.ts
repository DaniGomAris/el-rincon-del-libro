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
    'accion', 
    'ficcion', 
    'misterio', 
    'ciencia_ficcion', 
    'fantasia', 
    'biografia', 
    'romantica', 
    'historia', 
    'desarrollo_personal',
    'terror',
    'aventura',
    'comedia',
    'drama',
    'romance',
    'thriller',
    'suspenso',
    'policiaca',
    'autoayuda',
    'poesia',
    'cultura',
    'espionaje',
    'joven_adulto',
    'literatura_clasica',
    'humor',
    'literatura_infantil',
    'historia_real',
    'ensayo',
    'ficcion_historica',
    'literatura_contemporanea'
  ];
  generosAleatorios: string[] = [];
  precios: number[] = [];
  generoSeleccionado: string = '';

  constructor(
    private libroService: LibroService,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.generarGenerosAleatorios();
    const generoAleatorio = this.generos[Math.floor(Math.random() * this.generos.length)];
    this.cargarLibrosPorGenero(generoAleatorio);
  }

  // Metodo para generar una lista de generos aleatorios
  generarGenerosAleatorios(): void {
    const generosCopia = [...this.generos];
    this.generosAleatorios = [];
    
    while (this.generosAleatorios.length < 10 && generosCopia.length > 0) {
      const generoAleatorio = generosCopia.splice(Math.floor(Math.random() * generosCopia.length), 1)[0];
      this.generosAleatorios.push(generoAleatorio);
    }
  }

  // Metodo para filtrar libros por genero
  filtrarPorGenero(genero: string): void {
    this.generoSeleccionado = genero;
    this.cargarLibrosPorGenero(genero);
  }

  // Metodo para cargar los libros segun el genero
  cargarLibrosPorGenero(genero: string): void {
    this.libroService.buscarLibros(genero).subscribe((response: any) => {
      this.libros = response.docs.slice(0, 30);
      this.precios = this.libros.map(() => Math.floor(Math.random() * (100 - 5 + 1)) + 5);
      this.mostrarLibrosAleatorios();
    });
  }

  obtenerPrecio(libro: any): number {
    const index = this.libros.indexOf(libro);
    return this.precios[index] || 32;
  }

  // Metodo para mostrar libros aleatorios
  mostrarLibrosAleatorios(): void {
    const librosShuffle = [...this.libros];
    librosShuffle.sort(() => Math.random() - 0.5);
    this.librosAleatorios = librosShuffle.slice(0, 10);
  }

  // Metodo para agregar libros al carrito
  agregarAlCarrito(libro: any) {
    const libroConPrecio = { ...libro, precio: this.precios[this.libros.indexOf(libro)] };
    this.cartService.agregarAlCarrito(libroConPrecio);
    alert(`${libro.title} ha sido anadido al carrito.`);
  }
}

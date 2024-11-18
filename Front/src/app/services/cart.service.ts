// cart.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carrito: any[] = [];

  // Agregar un libro al carrito
  agregarAlCarrito(libro: any) {
    this.carrito.push(libro);
  }

  // Obtener todos los libros en el carrito
  obtenerCarrito() {
    return this.carrito;
  }

  // Eliminar un libro del carrito
  eliminarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
  }

  // Método para limpiar el carrito
  limpiarCarrito() {
    this.carrito = [];
  }
}


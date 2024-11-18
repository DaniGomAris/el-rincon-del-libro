// cart.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carrito: any[] = [];

  agregarAlCarrito(libro: any) {
    this.carrito.push(libro);
  }

  obtenerCarrito() {
    return this.carrito;
  }
  eliminarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
  }

  limpiarCarrito() {
    this.carrito = [];
  }
}


import { Component, OnInit } from '@angular/core';
import { CartService } from "../../../services/cart.service";
import { FooterComponent } from "../../../layout/pages/footer/footer.component";
import { HeaderComponent } from "../../../layout/pages/header/header.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterLink, CommonModule, FormsModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  carrito: any[] = [];
  total: number = 0;

  constructor(private readonly cartService: CartService) {} 

  ngOnInit(): void {
    this.carrito = this.cartService.obtenerCarrito();
    this.carrito.forEach(libro => {
      libro.cantidad = libro.cantidad || 1;
      libro.precioPorCantidad = libro.precio * libro.cantidad;
    });
    this.calcularTotal();
  }

  // Método para eliminar un libro del carrito
  eliminarDelCarrito(index: number): void {
    this.cartService.eliminarDelCarrito(index);
    this.carrito = this.cartService.obtenerCarrito();
    this.calcularTotal();
  }

  // Método para actualizar el precio de un libro según su cantidad
  actualizarPrecio(index: number): void {
    const libro = this.carrito[index];
    libro.precioPorCantidad = libro.precio * libro.cantidad;
    this.calcularTotal();
  }

  // Calcular el total general del carrito
  calcularTotal(): void {
    this.total = this.carrito.reduce((sum, libro) => sum + (libro.precioPorCantidad ?? libro.precio * libro.cantidad), 0);
  }

  // Método para proceder al pago
  procederAlPago(): void {
    alert("Redirigiendo a la página de pagos");
    this.cartService.limpiarCarrito();
    this.carrito = [];
    this.total = 0;
  }

  // Método para eliminar todo el carrito
  eliminarCarrito(): void {
    alert("Libros del carrito eliminados");
    this.cartService.limpiarCarrito();
    this.carrito = [];
    this.total = 0;
  }
}

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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.carrito = this.cartService.obtenerCarrito();
    this.calcularTotal();
    this.carrito.forEach(libro => {
      if (!libro.cantidad) {
        libro.cantidad = 1;
      }
    });
  }

  // Metodo para eliminar un libro del carrito
  eliminarDelCarrito(index: number) {
    this.cartService.eliminarDelCarrito(index);
    this.carrito = this.cartService.obtenerCarrito();
    this.calcularTotal();
  }

  // Metodo para actualizar el precio de un libro según su cantidad
  actualizarPrecio(index: number) {
    const libro = this.carrito[index];
    libro.precioPorCantidad = libro.precio * libro.cantidad;
    this.calcularTotal();
  }

  // Calcular el total general del carrito
  calcularTotal() {
    this.total = this.carrito.reduce((sum, libro) => sum + (libro.precioPorCantidad || (libro.precio * libro.cantidad) || 0), 0);
  }

  procederAlPago() {
    alert("Redirigiendo a la página de pagos");

    this.cartService.limpiarCarrito();
    this.carrito = [];
    this.total = 0;
  }
}

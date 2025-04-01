import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../../../layout/pages/header/header.component";
import { FooterComponent } from "../../../layout/pages/footer/footer.component";
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-informacion-libro',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './informacion-libro.component.html',
  styleUrls: ['./informacion-libro.component.css']
})
export class InformacionLibroComponent implements OnInit {
  libro: any = null;
  precio: number = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    const stateData = history.state;

    if (stateData.libro) {
      this.libro = stateData.libro;
      this.precio = stateData.precio || Math.floor(Math.random() * (100 - 5 + 1)) + 5;
    } else {
      this.router.navigate(['/']);
    }
  }

  agregarAlCarrito(): void {
    if (this.libro) {
      this.cartService.agregarAlCarrito({ ...this.libro, precio: this.precio });
      alert(`${this.libro.title} ha sido añadido al carrito.`);
    }
  }

  regresar(): void {
    this.router.navigate(['/']);
  }
}

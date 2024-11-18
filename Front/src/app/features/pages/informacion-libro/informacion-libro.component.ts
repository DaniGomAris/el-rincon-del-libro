import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from "../../../layout/pages/header/header.component";
import { FooterComponent } from "../../../layout/pages/footer/footer.component";
import { RouterLink } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const libroId = this.route.snapshot.paramMap.get('id');
    const stateData = history.state;

    if (stateData.libro) {
      this.libro = stateData.libro;
      this.precio = stateData.precio;
    } else {
      // Si no hay datos, redirigir al home
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

import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { CartPageComponent } from './features/pages/cart-page/cart-page.component';
import { EmpresaPageComponent } from './features/pages/empresa-page/empresa-page.component';
import { ContactoPageComponent } from './features/pages/contacto-page/contacto-page.component';
import { HeaderComponent } from './layout/pages/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './layout/pages/footer/footer.component';

@Component({
  selector: 'app-root',
   standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ContactoPageComponent,
    EmpresaPageComponent,
    CartPageComponent,
    HomeComponent,
    CommonModule,
    FormsModule,
    FooterComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Cambiado a styleUrls (en plural)
})
export class AppComponent {
  title = 'BookStore';
}

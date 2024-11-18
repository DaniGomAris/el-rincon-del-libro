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
import { InformacionPerfilComponent } from './features/pages/informacion-perfil/informacion-perfil.component';
import { EditarPerfilComponent } from './features/pages/editar-perfil/editar-perfil.component';
import { InformacionLibroComponent } from './features/pages/informacion-libro/informacion-libro.component';

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
    InformacionLibroComponent,
    InformacionPerfilComponent,
    EditarPerfilComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookStore';
}

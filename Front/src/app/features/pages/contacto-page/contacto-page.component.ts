import { Component } from '@angular/core';
import { HeaderComponent } from "../../../layout/pages/header/header.component";
import { FooterComponent } from "../../../layout/pages/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contacto-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './contacto-page.component.html',
  styleUrl: './contacto-page.component.css'
})
export class ContactoPageComponent {

}

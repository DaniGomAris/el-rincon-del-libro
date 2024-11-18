import { Component } from '@angular/core';
import { HeaderComponent } from "../../../layout/pages/header/header.component";
import { FooterComponent } from "../../../layout/pages/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-informacion-perfil',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './informacion-perfil.component.html',
  styleUrl: './informacion-perfil.component.css'
})
export class InformacionPerfilComponent {

}

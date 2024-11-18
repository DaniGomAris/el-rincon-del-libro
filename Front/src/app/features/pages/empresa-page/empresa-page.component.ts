import { Component } from '@angular/core';
import { HeaderComponent } from "../../../layout/pages/header/header.component";
import { FooterComponent } from "../../../layout/pages/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empresa-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './empresa-page.component.html',
  styleUrl: './empresa-page.component.css'
})
export class EmpresaPageComponent {

}

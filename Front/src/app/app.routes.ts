import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { SignInComponent } from './auth/pages/sign-in/sign-in.component';
import { CartPageComponent } from './features/pages/cart-page/cart-page.component';
import { EmpresaPageComponent } from './features/pages/empresa-page/empresa-page.component';
import { ContactoPageComponent } from './features/pages/contacto-page/contacto-page.component';
import { InformacionLibroComponent } from './features/pages/informacion-libro/informacion-libro.component';

export const routes: Routes = [
    {path: 'sign-in', component:SignInComponent},
    {path: 'sign-up', component:SignUpComponent},
    {path: 'home', component:HomeComponent},
    {path: 'cart', component:CartPageComponent},
    {path: 'empresa', component:EmpresaPageComponent},
    {path: 'contacto', component:ContactoPageComponent},
    {path: 'informacion-libro/:id', component:InformacionLibroComponent},
    {path: '', redirectTo:'home', pathMatch:'full'}
];

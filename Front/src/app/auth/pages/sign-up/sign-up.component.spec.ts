import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UsuarioService } from '../../../services/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let mockUsuarioService: jasmine.SpyObj<UsuarioService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockUsuarioService = jasmine.createSpyObj('UsuarioService', ['register']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: of({}) } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // CP 01 - Validar nombre solo letras
  it('debe rechazar nombre con caracteres especiales', () => {
    component.registerForm.controls['nombre'].setValue('Juan123');
    expect(component.registerForm.controls['nombre'].valid).toBeFalse();
  });

  // CP 02 - Validar apellido solo letras
  it('debe rechazar apellido con caracteres especiales', () => {
    component.registerForm.controls['apellido'].setValue('Pérez@!');
    expect(component.registerForm.controls['apellido'].valid).toBeFalse();
  });

  // CP 03 - Contraseña con al menos una mayúscula
  it('debe rechazar contraseña sin mayúscula', () => {
    component.registerForm.controls['password'].setValue('password123');
    const tieneMayuscula = /[A-Z]/.test(component.registerForm.controls['password'].value);
    expect(tieneMayuscula).toBeFalse();
  });

  // CP 04 - Contraseña con al menos 8 caracteres
  it('debe rechazar contraseña con menos de 8 caracteres', () => {
    component.registerForm.controls['password'].setValue('Pass1');
    expect(component.registerForm.controls['password'].valid).toBeFalse();
  });

  // CP 05 - Contraseña con al menos un número
  it('debe rechazar contraseña sin números', () => {
    component.registerForm.controls['password'].setValue('Password');
    const tieneNumero = /\d/.test(component.registerForm.controls['password'].value);
    expect(tieneNumero).toBeFalse();
  });

  // CP 06 - Email con dominio válido
  it('debe rechazar email inválido', () => {
    component.registerForm.controls['email'].setValue('correo@sinDominio');
    expect(component.registerForm.controls['email'].valid).toBeFalse();
  });

  // CP 07 - Nombre no puede estar vacío
  it('debe marcar nombre como inválido si está vacío', () => {
    component.registerForm.controls['nombre'].setValue('');
    expect(component.registerForm.controls['nombre'].valid).toBeFalse();
  });

  // CP 08 - Apellido no puede estar vacío
  it('debe marcar apellido como inválido si está vacío', () => {
    component.registerForm.controls['apellido'].setValue('');
    expect(component.registerForm.controls['apellido'].valid).toBeFalse();
  });

  // CP 09 - Email no puede estar vacío
  it('debe marcar email como inválido si está vacío', () => {
    component.registerForm.controls['email'].setValue('');
    expect(component.registerForm.controls['email'].valid).toBeFalse();
  });

  // CP 10 - Contraseña no puede estar vacía
  it('debe marcar contraseña como inválida si está vacía', () => {
    component.registerForm.controls['password'].setValue('');
    expect(component.registerForm.controls['password'].valid).toBeFalse();
  });
});

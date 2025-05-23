// sign-up.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UsuarioService } from '../../../services/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let mockUsuarioService: jasmine.SpyObj<UsuarioService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockUsuarioService = jasmine.createSpyObj('UsuarioService', ['register']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      declarations: [SignUpComponent],
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

  const expectInvalid = (controlName: string) => {
    // Arrange
    const control = component.registerForm.get(controlName);


    expect(control?.invalid).withContext(`${controlName} debe ser inválido`).toBeTrue();
  };

  it('debe crear el componente', () => {
    // Arrange
    expect(component).toBeTruthy();
  });

  it('debe rechazar nombre con caracteres especiales', () => {
    // Arrange
    const nombreControl = component.registerForm.get('nombre');

    // Act
    nombreControl?.setValue('Juan123');

     // Assert
    expectInvalid('nombre');
  });

  it('debe rechazar apellido con caracteres especiales', () => {
    // Arrange
    component.registerForm.get('apellido')?.setValue('Pérez@!');

     // Assert
    expectInvalid('apellido');
  });

  it('debe rechazar contraseña sin mayúscula', () => {
    // Arrange
    component.registerForm.get('password')?.setValue('password123');

    // Act
    const value = component.registerForm.get('password')?.value;

     // Assert
    expect(/[A-Z]/.test(value)).withContext('La contraseña debe tener una mayúscula').toBeFalse();
  });

  it('debe rechazar contraseña con menos de 8 caracteres', () => {
    // Arrange
    component.registerForm.get('password')?.setValue('Pass1');

     // Assert
    expectInvalid('password');
  });

  it('debe rechazar contraseña sin números', () => {
    // Arrange
    component.registerForm.get('password')?.setValue('Password');

    // Act
    const value = component.registerForm.get('password')?.value;

     // Assert
    expect(/\d/.test(value)).withContext('La contraseña debe tener al menos un número').toBeFalse();
  });

  it('debe rechazar email inválido', () => {
    // Arrange
    component.registerForm.get('email')?.setValue('correo@sinDominio');

     // Assert
    expectInvalid('email');
  });

  it('debe marcar campos vacíos como inválidos', () => {
    // Arrange
    component.registerForm.setValue({
      nombre: '',
      apellido: '',
      email: '',
      password: ''
    });

    // Act
    ['nombre', 'apellido', 'email', 'password'].forEach(expectInvalid);
  });

  it('debe enviar el formulario correctamente si es válido', () => {
    // Arrange
    const datos = {
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@mail.com',
      password: 'Pass1234'
    };

    // Act
    component.registerForm.setValue(datos);
    mockUsuarioService.register.and.returnValue(of({ success: true }));

     // Assert
    component.onSubmit();

    
    expect(mockUsuarioService.register).toHaveBeenCalledWith(
      datos.nombre,
      datos.apellido,
      datos.email,
      datos.password
    );
     // Assert
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sign-in']);
  });

  it('debe permitir al usuario llenar el formulario y enviarlo (UX)', () => {
    // Arrange
    const nombreInput = fixture.debugElement.query(By.css('input[formControlName="nombre"]')).nativeElement;
    const apellidoInput = fixture.debugElement.query(By.css('input[formControlName="apellido"]')).nativeElement;
    const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]')).nativeElement;
    const passInput = fixture.debugElement.query(By.css('input[formControlName="password"]')).nativeElement;
    const form = fixture.debugElement.query(By.css('form'));
    mockUsuarioService.register.and.returnValue(of({ success: true }));

    // Act
    nombreInput.value = 'Ana';
    nombreInput.dispatchEvent(new Event('input'));
    apellidoInput.value = 'Martínez';
    apellidoInput.dispatchEvent(new Event('input'));
    emailInput.value = 'ana@mail.com';
    emailInput.dispatchEvent(new Event('input'));
    passInput.value = 'Ana12345';
    passInput.dispatchEvent(new Event('input'));
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();

    // Assert
    expect(mockUsuarioService.register).toHaveBeenCalledWith(
      'Ana',
      'Martínez',
      'ana@mail.com',
      'Ana12345'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sign-in']);
  });
});

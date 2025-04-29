import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartPageComponent } from './cart-page.component';
import { CartService } from '../../../services/cart.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;
  let mockCartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    mockCartService = jasmine.createSpyObj('CartService', [
      'obtenerCarrito', 'eliminarDelCarrito', 'limpiarCarrito'
    ]);

    mockCartService.obtenerCarrito.and.returnValue([
      { title: 'Libro 1', author_name: 'Autor 1', precio: 20, cantidad: 2, cover_i: null }
    ]);

    await TestBed.configureTestingModule({
      imports: [CartPageComponent, ReactiveFormsModule],
      providers: [{ provide: CartService, useValue: mockCartService }]
    }).compileComponents();

    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería agregar un libro al carrito correctamente', () => {
    // Arrange
    const libro = { title: 'Libro 2', author_name: 'Autor 2', precio: 15, cantidad: 1, cover_i: null };
    mockCartService.obtenerCarrito.and.returnValue([libro]);

    // Act
    component.carrito = mockCartService.obtenerCarrito();
    component.actualizarPrecio(0);

    // Assert
    expect(component.carrito.length).toBe(1);
    expect(component.carrito[0].title).toBe('Libro 2');
    expect(component.total).toBeGreaterThan(0);
  });

  it('debería calcular el precio total correctamente', () => {
    // Arrange
    mockCartService.obtenerCarrito.and.returnValue([
      { title: 'Libro 1', author_name: 'Autor 1', precio: 20, cantidad: 2, cover_i: null },
      { title: 'Libro 2', author_name: 'Autor 2', precio: 15, cantidad: 3, cover_i: null }
    ]);

    // Act
    component.carrito = mockCartService.obtenerCarrito();
    component.calcularTotal();

    // Assert
    expect(component.total).toBe(105);
    expect(component.total).toBeGreaterThan(0);
  });

  it('debería eliminar un libro del carrito correctamente', () => {
    // Arrange
    mockCartService.obtenerCarrito.and.returnValue([]);
    spyOn(component, 'calcularTotal');

    // Act
    component.eliminarDelCarrito(0);

    // Assert
    expect(mockCartService.eliminarDelCarrito).toHaveBeenCalledWith(0);
    expect(component.carrito.length).toBe(0);
    expect(component.calcularTotal).toHaveBeenCalled();
  });

  it('debería vaciar el carrito correctamente', () => {
    // Arrange
    spyOn(window, 'alert');
    mockCartService.obtenerCarrito.and.returnValue([]);

    // Act
    component.eliminarCarrito();

    // Assert
    expect(window.alert).toHaveBeenCalledWith('Libros del carrito eliminados');
    expect(mockCartService.limpiarCarrito).toHaveBeenCalled();
    expect(component.carrito.length).toBe(0);
    expect(component.total).toBe(0);
  });

  it('debería mostrar el precio total correctamente en la interfaz', () => {
    // Arrange
    mockCartService.obtenerCarrito.and.returnValue([
      { title: 'Libro 1', author_name: 'Autor 1', precio: 20, cantidad: 2, cover_i: null }
    ]);

    component.carrito = mockCartService.obtenerCarrito();
    component.calcularTotal();
    fixture.detectChanges();

    // Act
    const totalPriceElement = fixture.debugElement.query(By.css('.total-price-button'));

    // Assert
    expect(totalPriceElement.nativeElement.textContent).toContain('Precio Total: $40');
  });

  it('debería simular el flujo completo: agregar, actualizar y proceder al pago', () => {
    // Arrange
    spyOn(window, 'alert');

    component.carrito = [
      { title: 'Libro 3', author_name: 'Autor 3', precio: 10, cantidad: 1, cover_i: null }
    ];
    component.calcularTotal();
    fixture.detectChanges();

    const buyButton = fixture.debugElement.query(By.css('.buy-button'));

    // Act
    buyButton.triggerEventHandler('click');
    fixture.detectChanges();

    // Assert
    expect(window.alert).toHaveBeenCalledWith('Redirigiendo a la página de pagos');
    expect(component.total).toBe(0);
    expect(component.carrito.length).toBe(0);
  });
});

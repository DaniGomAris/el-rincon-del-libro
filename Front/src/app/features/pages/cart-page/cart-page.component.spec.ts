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
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba: Verificar que el libro se agrega al carrito correctamente
  it('debe agregar un libro al carrito correctamente', () => {
    const libro = { title: 'Libro 2', author_name: 'Autor 2', precio: 15, cantidad: 1, cover_i: null };
    mockCartService.obtenerCarrito.and.returnValue([libro]);

    component.carrito = mockCartService.obtenerCarrito();
    component.actualizarPrecio(0);

    expect(component.carrito.length).toBe(1);
    expect(component.carrito[0].title).toBe('Libro 2');
  });

  // Prueba: Verificar que el precio total se calcula correctamente
  it('debe calcular el precio total correctamente', () => {
    mockCartService.obtenerCarrito.and.returnValue([
      { title: 'Libro 1', author_name: 'Autor 1', precio: 20, cantidad: 2, cover_i: null },
      { title: 'Libro 2', author_name: 'Autor 2', precio: 15, cantidad: 3, cover_i: null }
    ]);

    component.carrito = mockCartService.obtenerCarrito();
    component.calcularTotal();

    expect(component.total).toBe(105);
  });

  // Prueba: Verificar que el libro se elimina del carrito correctamente
  it('debe eliminar un libro del carrito correctamente', () => {
    mockCartService.obtenerCarrito.and.returnValue([
      { title: 'Libro 1', author_name: 'Autor 1', precio: 20, cantidad: 2, cover_i: null }
    ]);
    spyOn(component, 'calcularTotal');

    component.eliminarDelCarrito(0);

    expect(mockCartService.eliminarDelCarrito).toHaveBeenCalledWith(0);
    expect(component.carrito.length).toBe(0);
    expect(component.calcularTotal).toHaveBeenCalled();
  });

  // Prueba: Verificar que el carrito se vacía correctamente
  it('debe vaciar el carrito correctamente', () => {
    mockCartService.obtenerCarrito.and.returnValue([
      { title: 'Libro 1', author_name: 'Autor 1', precio: 20, cantidad: 2, cover_i: null }
    ]);
    spyOn(window, 'alert');
    spyOn(mockCartService, 'limpiarCarrito');

    component.eliminarCarrito();

    expect(window.alert).toHaveBeenCalledWith('Libros del carrito eliminados');
    expect(mockCartService.limpiarCarrito).toHaveBeenCalled();
    expect(component.carrito.length).toBe(0);
  });

  // Prueba: Verificar que el precio total muestra el valor correcto
  it('debe mostrar el precio total correctamente en la interfaz', () => {
    mockCartService.obtenerCarrito.and.returnValue([
      { title: 'Libro 1', author_name: 'Autor 1', precio: 20, cantidad: 2, cover_i: null }
    ]);
    component.carrito = mockCartService.obtenerCarrito();
    component.calcularTotal();
    fixture.detectChanges();

    const totalPriceElement = fixture.debugElement.query(By.css('.total-price-button'));

    expect(totalPriceElement.nativeElement.textContent).toContain('Precio Total: $40');
  });
});

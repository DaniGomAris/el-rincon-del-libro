import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionLibroComponent } from './informacion-libro.component';

describe('InformacionLibroComponent', () => {
  let component: InformacionLibroComponent;
  let fixture: ComponentFixture<InformacionLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacionLibroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

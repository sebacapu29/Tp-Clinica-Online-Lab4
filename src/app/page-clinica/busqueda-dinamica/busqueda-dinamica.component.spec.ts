import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaDinamicaComponent } from './busqueda-dinamica.component';

describe('BusquedaDinamicaComponent', () => {
  let component: BusquedaDinamicaComponent;
  let fixture: ComponentFixture<BusquedaDinamicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaDinamicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaDinamicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

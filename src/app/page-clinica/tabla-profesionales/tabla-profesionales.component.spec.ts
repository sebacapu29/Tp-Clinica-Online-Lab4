import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaProfesionalesComponent } from './tabla-profesionales.component';

describe('TablaProfesionalesComponent', () => {
  let component: TablaProfesionalesComponent;
  let fixture: ComponentFixture<TablaProfesionalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaProfesionalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

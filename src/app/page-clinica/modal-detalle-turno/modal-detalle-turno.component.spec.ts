import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleTurnoComponent } from './modal-detalle-turno.component';

describe('ModalDetalleTurnoComponent', () => {
  let component: ModalDetalleTurnoComponent;
  let fixture: ComponentFixture<ModalDetalleTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

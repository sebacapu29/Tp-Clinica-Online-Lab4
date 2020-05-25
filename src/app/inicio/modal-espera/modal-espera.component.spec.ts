import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEsperaComponent } from './modal-espera.component';

describe('ModalEsperaComponent', () => {
  let component: ModalEsperaComponent;
  let fixture: ComponentFixture<ModalEsperaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEsperaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

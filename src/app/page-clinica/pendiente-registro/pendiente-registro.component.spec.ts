import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendienteRegistroComponent } from './pendiente-registro.component';

describe('PendienteRegistroComponent', () => {
  let component: PendienteRegistroComponent;
  let fixture: ComponentFixture<PendienteRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendienteRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendienteRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

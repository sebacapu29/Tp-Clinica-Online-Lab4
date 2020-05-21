import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionTurnosComponent } from './atencion-turnos.component';

describe('AtencionTurnosComponent', () => {
  let component: AtencionTurnosComponent;
  let fixture: ComponentFixture<AtencionTurnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtencionTurnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

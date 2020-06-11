import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEncuestaComponent } from './registro-encuesta.component';

describe('RegistroEncuestaComponent', () => {
  let component: RegistroEncuestaComponent;
  let fixture: ComponentFixture<RegistroEncuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEncuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

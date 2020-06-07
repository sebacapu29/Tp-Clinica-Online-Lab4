import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendienteModalComponent } from './pendiente-modal.component';

describe('PendienteModalComponent', () => {
  let component: PendienteModalComponent;
  let fixture: ComponentFixture<PendienteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendienteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

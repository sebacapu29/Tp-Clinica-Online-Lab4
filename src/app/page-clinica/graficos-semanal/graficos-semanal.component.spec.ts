import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosSemanalComponent } from './graficos-semanal.component';

describe('GraficosSemanalComponent', () => {
  let component: GraficosSemanalComponent;
  let fixture: ComponentFixture<GraficosSemanalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficosSemanalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

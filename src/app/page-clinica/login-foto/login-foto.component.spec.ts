import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFotoComponent } from './login-foto.component';

describe('LoginFotoComponent', () => {
  let component: LoginFotoComponent;
  let fixture: ComponentFixture<LoginFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

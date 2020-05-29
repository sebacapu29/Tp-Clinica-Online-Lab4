import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPrincipalComponent } from './login-principal.component';

describe('LoginPrincipalComponent', () => {
  let component: LoginPrincipalComponent;
  let fixture: ComponentFixture<LoginPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

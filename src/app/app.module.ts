import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './inicio/login/login.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { PrincipalComponent } from './page-clinica/principal/principal.component';
import { RegistroComponent } from './inicio/registro/registro.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { HttpClientModule} from '@angular/common/http';
import { MenuNavComponent } from './page-clinica/menu-nav/menu-nav.component';
import { PageErrorComponent } from './inicio/page-error/page-error.component';
import { ListadosComponent } from './page-clinica/listados/listados.component';
import { TablaPacientesComponent } from './page-clinica/tabla-pacientes/tabla-pacientes.component';
import { TablaProfesionalesComponent } from './page-clinica/tabla-profesionales/tabla-profesionales.component';
import { TurnosComponent } from './page-clinica/turnos/turnos.component';
import { AltaUsuariosComponent } from './page-clinica/alta-usuarios/alta-usuarios.component';
import { TablaTurnosComponent } from './page-clinica/tabla-turnos/tabla-turnos.component';
import { AtencionTurnosComponent } from './page-clinica/atencion-turnos/atencion-turnos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginFotoComponent } from './inicio/login-foto/login-foto.component';
import { BannerComponent } from './page-clinica/banner/banner.component';
import { FooterPageComponent } from './page-clinica/footer-page/footer-page.component';
import { ModalEsperaComponent } from './inicio/modal-espera/modal-espera.component';
import { RegistroProfesionalComponent } from './inicio/registro-profesional/registro-profesional.component';
import { DetalleTurnosComponent } from './page-clinica/detalle-turnos/detalle-turnos.component';
import { LoginPrincipalComponent } from './inicio/login-principal/login-principal.component';
import {MaterialModule} from './angular-material/material-module/material-module.module';
import { PendienteRegistroComponent } from './page-clinica/pendiente-registro/pendiente-registro.component';
import { DiaSemanaPipe } from './pipes/dia-semana.pipe';
import { RecaptchaModule } from 'ng-recaptcha';
import { PendienteModalComponent } from './page-clinica/pendiente-modal/pendiente-modal.component';
import { ModalDetalleTurnoComponent } from './page-clinica/modal-detalle-turno/modal-detalle-turno.component';
// if you need forms support:
// import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    RegistroComponent,
    MenuNavComponent,
    PageErrorComponent,
    ListadosComponent,
    TablaPacientesComponent,
    TablaProfesionalesComponent,
    TurnosComponent,
    AltaUsuariosComponent,
    TablaTurnosComponent,
    AtencionTurnosComponent,
    LoginFotoComponent,
    BannerComponent,
    FooterPageComponent,
    ModalEsperaComponent,
    RegistroProfesionalComponent,
    DetalleTurnosComponent,
    LoginPrincipalComponent,
    PendienteRegistroComponent,
    DiaSemanaPipe,
    PendienteModalComponent,
    ModalDetalleTurnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),// Initialize Firebase
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    ReactiveFormsModule,
    RecaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

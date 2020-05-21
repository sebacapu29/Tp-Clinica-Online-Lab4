import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './inicio/login/login.component';
import {FormsModule} from '@angular/forms';
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
    AtencionTurnosComponent
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

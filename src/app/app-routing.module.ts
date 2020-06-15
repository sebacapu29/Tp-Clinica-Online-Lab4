import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './inicio/login/login.component';
import { RegistroComponent } from './inicio/registro/registro.component';
import { PrincipalComponent } from './page-clinica/principal/principal.component';
import { CanActivateGuard} from './can-activate.guard';
import { PageErrorComponent } from './inicio/page-error/page-error.component';
import { ListadosComponent } from './page-clinica/listados/listados.component';
import { TurnosComponent } from './page-clinica/turnos/turnos.component';
import { AltaUsuariosComponent } from './page-clinica/alta-usuarios/alta-usuarios.component';
import { AtencionTurnosComponent } from './page-clinica/atencion-turnos/atencion-turnos.component';
import { LoginFotoComponent } from './inicio/login-foto/login-foto.component';
import { BannerComponent } from './page-clinica/banner/banner.component';
import { FooterPageComponent } from './page-clinica/footer-page/footer-page.component';
import { MenuNavComponent } from './page-clinica/menu-nav/menu-nav.component';
import { LoginPrincipalComponent } from './inicio/login-principal/login-principal.component';
import { PendienteRegistroComponent } from './page-clinica/pendiente-registro/pendiente-registro.component';
import { ReportesComponent } from './page-clinica/reportes/reportes.component';
import { EncuestaComponent } from './page-clinica/encuesta/encuesta.component';
import { GraficosComponent } from './page-clinica/graficos/graficos.component';
import { BusquedaDinamicaComponent } from './page-clinica/busqueda-dinamica/busqueda-dinamica.component';

const routes: Routes = [
  {path:'',component:PrincipalComponent,canActivate:[CanActivateGuard]},
  {path:'Registro',component:RegistroComponent},
  {path:'Login',component:LoginPrincipalComponent}, 
  {path:'Principal',component:PrincipalComponent,canActivate:[CanActivateGuard], data:{animation:'isRight'}},   
  {path:'Pendientes',component:PendienteRegistroComponent,canActivate:[CanActivateGuard], data:{animation:'isLeft'}},   
  {path:'Listados/:tipo',component:ListadosComponent,canActivate:[CanActivateGuard]},
  {path:'Reportes',component:ReportesComponent,canActivate:[CanActivateGuard]},
  {path:'Turnos',component:TurnosComponent,canActivate:[CanActivateGuard]},
  {path:'AtenderTurnos',component:AtencionTurnosComponent,canActivate:[CanActivateGuard]},
  {path:'Alta',component:AltaUsuariosComponent,canActivate:[CanActivateGuard]},
  {path:'Graficos',component:GraficosComponent,canActivate:[CanActivateGuard]},
  {path:'BusquedaDin',component:BusquedaDinamicaComponent,canActivate:[CanActivateGuard]},
  {path:'Encuesta',component:EncuestaComponent,canActivate:[CanActivateGuard]},
  {path:'**',component:PageErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

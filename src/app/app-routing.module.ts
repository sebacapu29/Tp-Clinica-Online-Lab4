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
import { LoginFotoComponent } from './page-clinica/login-foto/login-foto.component';
import { BannerComponent } from './page-clinica/banner/banner.component';

const routes: Routes = [
  {path:'',component:BannerComponent},
  {path:'Registro',component:RegistroComponent},
  {path:'Listados/:tipo',component:ListadosComponent,canActivate:[CanActivateGuard]},
  {path:'Turnos',component:TurnosComponent,canActivate:[CanActivateGuard]},
  {path:'AtenderTurnos',component:AtencionTurnosComponent,canActivate:[CanActivateGuard]},
  {path:'Alta',component:AltaUsuariosComponent,canActivate:[CanActivateGuard]},
  {path:'**',component:PageErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

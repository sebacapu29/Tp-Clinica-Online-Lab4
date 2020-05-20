import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './inicio/login/login.component';
import { RegistroComponent } from './inicio/registro/registro.component';
import { PrincipalComponent } from './page-clinica/principal/principal.component';
import { CanActivateGuard} from './can-activate.guard';
import { PageErrorComponent } from './inicio/page-error/page-error.component';

const routes: Routes = [
  {path:'',component:PrincipalComponent,canActivate:[CanActivateGuard]},
  {path:'Login',component:LoginComponent},
  {path:'Registro',component:RegistroComponent},
  {path:'**',component:PageErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

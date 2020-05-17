import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './inicio/login/login.component';
import { RegistroComponent } from './inicio/registro/registro.component';
import { PrincipalComponent } from './page-clinica/principal/principal.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'Login',component:LoginComponent},
  {path:'Registro',component:RegistroComponent},
  {path:'Principal',component:PrincipalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

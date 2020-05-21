import { Component } from '@angular/core';
import { UsuarioService } from './servicios/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clinica-online';
  esUsuarioLogueado:boolean=false;

  constructor(public usuarioSevice:UsuarioService){
    // if(usuarioSevice.IsLogIn()){
    //   this.esUsuarioLogueado=true;
    // }
  }
  tomarLogueoDeUsuario(){
    this.esUsuarioLogueado = true;
  }
  tomarDeslogueoDeUsuario(){
    this.esUsuarioLogueado = false;
  }
}

import { Component } from '@angular/core';
import { UsuarioService } from './servicios/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clinica-online';
  usuarioLogueado:boolean=true;

  constructor(public usuarioSevice:UsuarioService){

  }
}

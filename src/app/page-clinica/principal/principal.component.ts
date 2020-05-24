import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  listUsuarios:Usuario[];
  usuarioLogueado:Usuario;
  esUsuarioLogueado:boolean;
  esInicioConFoto:boolean;
  constructor(public usuarioServ:UsuarioService) {
      this.usuarioServ.obtenerUsuarios().subscribe(res => 
        this.listUsuarios = res); 
        this.usuarioLogueado = new Usuario();       
   }

  ngOnInit(): void {
  }
  ObtenerUsuarioLoguado(){
    var usuarioLogueado= JSON.stringify(localStorage.getItem("usuarioLogueadoMail"));

    for (let index = 0; index < this.listUsuarios.length; index++) {
      const usuarioEnDB = this.listUsuarios[index];
      if(usuarioEnDB.mail== usuarioLogueado){
        this.usuarioLogueado = usuarioEnDB;
        break;
      }
    }
  }
  tomarEstadoUsuario(esUsuarioLogueado){
    this.esUsuarioLogueado = esUsuarioLogueado;
  }
}

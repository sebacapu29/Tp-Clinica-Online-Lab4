import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-pendiente-registro',
  templateUrl: './pendiente-registro.component.html',
  styleUrls: ['./pendiente-registro.component.css']
})
export class PendienteRegistroComponent implements OnInit {

  listaProfesionales:Usuario[];

  constructor(private usuarioServ:UsuarioService) { 
    this.usuarioServ.obtenerPorEntidadYParametros<Usuario>("roll","1","usuarios").subscribe((response)=>{
      
      var listaFiltrada = response.filter((resp)=>{
        if(!resp.activo){
          return resp;
        }
      });

      this.listaProfesionales = listaFiltrada;
      console.log(listaFiltrada);
    });
  }  

  ngOnInit(): void {
  }
onusuarioSeleccionada(usuario){

}
}

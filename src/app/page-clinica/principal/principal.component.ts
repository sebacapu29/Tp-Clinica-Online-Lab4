import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/clases/usuario';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  listUsuarios:Usuario[]=[];
  usuarioLogueado:Usuario;
  esUsuarioLogueado:boolean;
  esInicioConFoto:boolean;
  mailUsuarioCatche:string;
  ocultarPorRegistro:boolean;
  ocultarBanner:boolean;

  constructor(public usuarioServ:UsuarioService) {
        this.traerTodos(this.listUsuarios);
        this.usuarioLogueado = new Usuario();  
        this.usuarioServ.IsLogIn().subscribe(res=>{ if(res!=null) this.esUsuarioLogueado=true;});     
   }
  ngOnInit(): void {
    this.esInicioConFoto = localStorage.getItem("imgUsuarioRegistrado")!=null;       
  }
  traerTodos(listaUsuarios:Usuario[]){
     this.usuarioServ.obtenerUsuarios().subscribe(res => 
      {
        this.listUsuarios = res;
        var mailUsuarioLogueado= JSON.stringify(localStorage.getItem("usuarioLogueadoMail"));
        this.ObtenerUsuarioLoguado(mailUsuarioLogueado);
      }
      ); 
  }
  ObtenerUsuarioLoguado(mailUsuarioLogueado){
     
    for (let index = 0; index < this.listUsuarios.length; index++) {
      const usuarioEnDB = this.listUsuarios[index]; 
      // console.log("usuarioDBMail",JSON.stringify(usuarioEnDB.mail));
      // console.log("mailLogueado",mailUsuarioLogueado)
      if(JSON.stringify(usuarioEnDB.mail).trim() === JSON.stringify(mailUsuarioLogueado).trim()){
        this.usuarioLogueado = usuarioEnDB;      
      
        localStorage.setItem("imgUsuarioRegistrado",JSON.stringify(usuarioEnDB.foto));   
        this.esInicioConFoto=true;     
        break;
      }
    }
  }
  tomarEstadoUsuario(esUsuarioLogueado){
    this.esUsuarioLogueado = esUsuarioLogueado;
  }
  tomarUsuarioMail(mail:string){
    this.mailUsuarioCatche= mail;
    this.esInicioConFoto=false;
  }
  tomarUsuarioLogueado(usuario:string){
    // console.log("tomarUsuarioLogueado",usuario);
    this.ObtenerUsuarioLoguado(usuario);
  }
  seleccionoRegistrar(){
    this.ocultarPorRegistro=true;
  }
  tomarOcultarBanner(e){
    console.log(e);
   this.ocultarBanner = e == null? false:true;
  }
}

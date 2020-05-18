import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario;
  ingresando:boolean=false;

  constructor(private router:Router,private usuarioServicio:UsuarioService
   ) {
    this.inicializarUsuario();
   }

  ngOnInit(): void {
  }
  LoginUsuario(){

    if(this.usuario.mail == "" || this.usuario.clave ==""){
      alert("ingresar datos");
      return;
    }
    this.ingresando=true;
    this.usuarioServicio.login(this.usuario).then(res=>{
      //  console.log(res);
      this.router.navigate(['']);   
     })
     .catch(error=> {
       alert("usuario - contraseña incorrecta");
      this.ingresando=false;
      return false;  
    }
     ); 
  }
  Registrarme(){
    this.router.navigate(['Registro']);
  }
  inicializarUsuario(){
    this.usuario = new Usuario();
    this.usuario.clave="";
    this.usuario.mail="";    
  }
}

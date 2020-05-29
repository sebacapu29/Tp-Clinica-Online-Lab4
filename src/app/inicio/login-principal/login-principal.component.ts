import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-principal',
  templateUrl: './login-principal.component.html',
  styleUrls: ['./login-principal.component.css']
})
export class LoginPrincipalComponent implements OnInit {

  esConFoto:boolean=false;
  nombreUsuario:string;

  constructor() { 
    var hayFoto = localStorage.getItem("imgUsuarioRegistrado");
    if(hayFoto!= undefined){
      this.esConFoto=true;
    }          
  }

  ngOnInit(): void {
  }
tomarOtraCuenta(){
  // this.esConFoto=false;
}
tomarUsuario(usuario:string){
  // this.esConFoto=false;
  this.nombreUsuario=usuario;
}
}

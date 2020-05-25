import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { URL } from 'url';
import { encode } from 'punycode';

@Component({
  selector: 'app-login-foto',
  templateUrl: './login-foto.component.html',
  styleUrls: ['./login-foto.component.css']
})
export class LoginFotoComponent implements OnInit {

  imagenLogin:string;
  nombreUsuario:string="sin";
  @Output() iniciarSesionConUsuario:EventEmitter<string>=new EventEmitter<string>();
  constructor(private router:Router) {

   }

  ngOnInit(): void {
    var imgPath =  localStorage.getItem("imgUsuarioRegistrado");

    this.imagenLogin = JSON.parse(imgPath);
    this.nombreUsuario = localStorage.getItem("usuarioLogueadoMail");
  }
  iniciarSesion(){
    this.iniciarSesionConUsuario.emit(this.nombreUsuario);
  }
  otraCuenta(){
    this.iniciarSesionConUsuario.emit("");
  }
}

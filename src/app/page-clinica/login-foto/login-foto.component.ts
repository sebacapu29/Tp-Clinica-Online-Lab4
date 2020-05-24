import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-foto',
  templateUrl: './login-foto.component.html',
  styleUrls: ['./login-foto.component.css']
})
export class LoginFotoComponent implements OnInit {

  imagenLogin:string;
  nombreUsuario:string="sin";
  constructor(private router:Router) {

   }

  ngOnInit(): void {
    this.imagenLogin = localStorage.getItem("imgUsuarioRegistrado");
  }
  iniciarSesion(){

  }
  otraCuenta(){
    this.router.navigate(['Login']);
  }
}

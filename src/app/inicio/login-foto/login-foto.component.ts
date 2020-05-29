import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { URL } from 'url';
import { encode } from 'punycode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-login-foto',
  templateUrl: './login-foto.component.html',
  styleUrls: ['./login-foto.component.css']
})
export class LoginFotoComponent implements OnInit {

  imagenLogin:string;
  nombreUsuario:string="sin";
  @Output() iniciarSesionConUsuario:EventEmitter<string>=new EventEmitter<string>();
  @Output() iniciarConOtraCuenta:EventEmitter<any>=new EventEmitter<any>();
  constructor(private router:Router,private modalService: NgbModal) {

   }

  ngOnInit(): void {
    var imgPath =  localStorage.getItem("imgUsuarioRegistrado");

    this.imagenLogin = JSON.parse(imgPath);
    this.nombreUsuario = localStorage.getItem("usuarioLogueadoMail");
  }
  iniciarSesion(){
    this.openModal(this.nombreUsuario);
    this.iniciarSesionConUsuario.emit(this.nombreUsuario);
  }
  otraCuenta(){    
    this.iniciarConOtraCuenta.emit();
  }
  openModal(mailUsuario:string){    
    const modalRef = this.modalService.open(LoginComponent,{windowClass: 'modal-holder', centered: true});
    modalRef.componentInstance.mailUsuario= mailUsuario;
    // modalRef.componentInstance.respCorrecta=respCorrect;
    // modalRef.componentInstance.imagenResultado = urlImg;
  }
}

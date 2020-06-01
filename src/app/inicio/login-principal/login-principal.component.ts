import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-login-principal',
  templateUrl: './login-principal.component.html',
  styleUrls: ['./login-principal.component.css']
})
export class LoginPrincipalComponent implements OnInit {

  esConFoto:boolean=false;
  nombreUsuario:string;

  constructor(private modalService: NgbModal) { 
    var hayFoto = localStorage.getItem("imgUsuarioRegistrado");
    if(hayFoto!= undefined){
      this.esConFoto=true;
    }   
    else{
      const modalRef = this.modalService.open(LoginComponent,{windowClass: 'modal-holder', centered: true});
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

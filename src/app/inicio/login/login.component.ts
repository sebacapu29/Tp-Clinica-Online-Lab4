import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() usuario:Usuario;
  ingresando:boolean=false;
  @Input() mailUsuario;
  @Output() onLoginUsuario:EventEmitter<any> = new EventEmitter();
  @Output() onSeleccionRegistro:EventEmitter<any> = new EventEmitter();
  recaptcha:boolean =false;
  captchaHabilitado:boolean=true;

  constructor(private router:Router,private usuarioServicio:UsuarioService,private toastr:ToastrService,public activeModal:NgbActiveModal
   ) {
     if(activeModal==null){
       activeModal = new NgbActiveModal();
     }
   this.usuarioServicio.IsLogIn().subscribe((e)=>{
     
   });

   }

  ngOnInit(): void {
    this.inicializarUsuario();
  }
  public resolved(captchaResponse: string) {
    this.recaptcha=true;
    // console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  LoginUsuario(){

    if(this.usuario.mail == "" || this.usuario.clave ==""){
      this.mostrarMensajeError("Ingrese Usuario y Contraseña");
      return;
    }
    this.ingresando=true;

    this.usuarioServicio.login(this.usuario).then(res=>{
      var nombreUsuario="";
      if(res!=null){
        this.usuarioServicio.obtenerPorEntidadYParametros("mail",this.usuario.mail,"usuarios").subscribe((respU)=>{
          if(respU!=null){
            nombreUsuario=(<Usuario>respU[0]).nombre;
            localStorage.setItem("usuarioLogueadoMail",this.usuario.mail);
            localStorage.setItem("nombre",nombreUsuario);
            this.onLoginUsuario.emit(this.usuario.mail);
            this.usuarioServicio.RegistrarLogueo(this.usuario.mail);
            this.activeModal.dismiss();
            this.router.navigate(['']);   
          }
        })
      }
         
     })
     .catch(error=> {
       this.mostrarMensajeError(error);
      this.ingresando=false;
      return false;  
    }
     ); 
  }
  Registrarme(){
    this.activeModal.close();
    this.onSeleccionRegistro.emit();
    this.router.navigate(['Registro']);
  }
  deshabilitarCaptcha(){
    this.captchaHabilitado=false;
    this.recaptcha=true;
  }
  inicializarUsuario(){
    
    if(this.usuario==null){
      this.usuario = new Usuario();
    }
    this.usuario.mail=this.mailUsuario;
  }
  LoginInvitado(event)
  {
    var tipoInivitado = event.target.value;
    switch(tipoInivitado){
      case 'profesional':
        this.usuario.mail="profesional@gmail.com";
          this.usuario.clave="abc123456";          
        break;
        case 'profesional-pendiente':
          this.usuario.mail="profesional_prendiente@clinica.com";
            this.usuario.clave="abc123456";          
          break;
          case 'profesional2':
            this.usuario.mail="profesional3@clinica.com";
              this.usuario.clave="abc123456";          
            break;
        case 'paciente':
          this.usuario.mail="paciente_invitado@clinica.com";
          this.usuario.clave="abc123456";         
          break;
          case 'paciente2':
            this.usuario.mail="paciente_invitado2@clinica.com";
            this.usuario.clave="abc123456";         
            break;
          case 'admin':
            this.usuario.mail="admin@clinica.com";
            this.usuario.clave="abc123456";           
            break;
    }
  }
  mostrarMensajeError(mensaje){
    this.toastr.error("Ocurrio un error: "+mensaje);
  }
}

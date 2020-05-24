import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Notification } from 'rxjs';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { finalize, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [{provide:ToastrService}]
})
export class RegistroComponent implements OnInit {

  usuario:Usuario;
  confimarcionClave:string;
  uploadPercent:number=0;
  foto:any;
  pathRegistro:string = environment.pathImgRegistro;
  
  constructor(private storage:AngularFireStorage, private usuarioServ:UsuarioService
              ,public toastr: ToastrService) {
      this.usuario = new Usuario();
   }

  ngOnInit(): void {
  }
Registrarme(){
  if(this.usuario.nombre== undefined || this.usuario.mail== undefined ||
    this.usuario.clave== undefined || this.usuario.fecha_nacimiento==undefined 
    || this.foto== undefined || this.usuario.sexo== undefined ||
    this.usuario.apellido == undefined){
      
      this.mostrarMensajeError("Hay campos incompletos");
      return;
    }
  this.usuarioServ.registroAutentificado(this.usuario.mail,this.usuario.clave).
  then(()=>{
    this.SubirFoto();
  }).catch((error)=>{
    this.mostrarMensajeError(error);
    // console.log(error);
  });
}

 SubirFoto(){
  var metadata = {
    customMetadata: {
      usuario: this.usuario.nombre
    }
  }
  const idFoto = Math.random().toString(32).substring(2);//Obtiene un string aleatorio como identificador.
 
  const filePath = this.pathRegistro + this.usuario.nombre + "_" + idFoto;

  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(filePath,this.foto,metadata);
  
  //Metodo asincronico devuelve el estado actual del objeto
  task.snapshotChanges()
  .pipe(
    finalize(()=>
    fileRef.getDownloadURL().subscribe(urlImg=>{
      // console.log("url_img",urlImg);
      this.usuario.foto = urlImg;
      var registro=this;
      var usuario = this.usuario;
      localStorage.setItem('imgUsuarioRegistrado',urlImg);
      this.usuarioServ.CrearUsuarioEnBD(this.usuario).then(function(docRef) {
        // console.log("docref",docRef);
            usuario.id = docRef.id;    
            localStorage.setItem("usuario",docRef.id.toString());
            registro.mostrarMensajeExito();
          })
          .catch(function(error) {
            registro.mostrarMensajeError(error);
          }
          );
    },
      error=> this.mostrarMensajeError(error)
    )
    )
  ).subscribe();
 
   task.percentageChanges().subscribe((perChanges)=>{
     this.uploadPercent = Math.round(100.0 * perChanges);
    // console.log(this.uploadPercent);
   }); 
 }
 loadFoto(e){
  this.foto = e.target.files[0];   //para obtener la imagen del archivo.
 }
 mostrarMensajeExito() {
  this.toastr.success("Registro Completado!");
}
mostrarMensajeError(mensaje){
  this.toastr.error("Ocurrio un error: "+mensaje);
}
}

import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Notification } from 'rxjs';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { finalize, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/clases/especialidad';
import { Jornada } from 'src/app/clases/jornada';
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
  registrando:boolean;
  esProfesional:boolean;
  especialidades:Especialidad[];
  jornada:Jornada;

  constructor(private storage:AngularFireStorage, private usuarioServ:UsuarioService
              ,public toastr: ToastrService,private router:Router) {
      this.usuario = new Usuario();
   }

  ngOnInit(): void {
  }
  checkValue(check){
    if(check){
      this.esProfesional=true;    
    }
    else{
      this.esProfesional=false;
    }
  }
Registrarme(){
  this.registrando=true;
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
      // console.log(urlImg);
      if(this.esProfesional){
          this.usuario.activo=false;
          this.usuario.roll=1;
          //
          // this.usuarioServ.CrearJornadaEnBD(this.jornada).then(function(docRef) {

          // });
          // this.usuarioServ.CrearEspecialidadesEnBD(this.especialidades).then(function(docRef) {

          // });
          //insertar jornadas
          //instar especialidades
      }
      else{
        this.usuario.roll=0;
      }
      localStorage.setItem('imgUsuarioRegistrado',urlImg);
      this.usuarioServ.CrearUsuarioEnBD(this.usuario).then(function(docRef) {
        // console.log("docref",docRef);
            usuario.id = docRef.id;    
            // localStorage.setItem("usuario",docRef.id.toString());
            localStorage.setItem("usuarioLogueadoMail",registro.usuario.mail);
            registro.mostrarMensajeExito();
            registro.registrando=false;
            registro.router.navigate(['']);
          })
          .catch(function(error) {
            registro.mostrarMensajeError(error);
            registro.registrando=false;
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
tomarJornada(jornada:Jornada){
  this.jornada= jornada;
}
tomarEspecialidad(especialidades:string[]){
  for (let index = 0; index < especialidades.length; index++) {
    const especialidad = especialidades[index];
    var especialidadAux = new Especialidad();
    especialidadAux.idProfesional= this.usuario.mail;
    especialidadAux.especialidad = especialidad;
  }
  // this.especialidades = especialidades;
}
}

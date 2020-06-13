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
import { DIAS_SEMANA } from 'src/app/clases/constantes';
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
  esProfesional:boolean=false;
  especialidades:Especialidad[];
  jornada:Jornada;
  checkProfesional:boolean=true;
  checks:any;
  listaDiasDeSemana:string[];
  seleccionDiasDesemana:string[];
  listaHorarios:string[];
  listaEspecialidades:string[];
  fileName:string;
  constructor(private storage:AngularFireStorage, private usuarioServ:UsuarioService
              ,public toastr: ToastrService,private router:Router) {
      this.usuario = new Usuario();
      this.especialidades = new Array<Especialidad>();
      this.usuario = new Usuario();
      this.listaDiasDeSemana = DIAS_SEMANA;
      this.jornada = new Jornada();
      this.CargarListaHorarios();
      this.fileName = "Seleccione Archivo";
   }

  ngOnInit(): void {
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
      usuario: this.usuario.nombre,
      mail:this.usuario.mail
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
      
      if(this.esProfesional){
         this.usuario.activo=false;
         this.usuario.roll=1; 
         this.CargarObjJornada();
         this.CargarObjEspecialidades();
         this.CrearJornada();
         this.CrearEspecialidades();        
      }
      else{
        this.usuario.roll=0;
        this.usuario.activo=true;
      }
      localStorage.setItem('imgUsuarioRegistrado',urlImg);
      this.usuarioServ.CrearUsuarioEnBD(this.usuario).then(function(docRef) {
        // console.log("docref",docRef);
            usuario.id = docRef.id;    
            // localStorage.setItem("usuario",docRef.id.toString());
            localStorage.setItem("usuarioLogueadoMail",registro.usuario.mail);
            registro.usuarioServ.ActualizarUsuarioID(docRef.id);
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
 }
 prueba(){
  //  this.cargarProfesional();
   console.log(this.esProfesional);
  //  console.log(this.especialidades);
  //  console.log(this.jornada);
 }
 private CrearJornada(){        
  this.usuarioServ.CrearJornadaEnBD(this.jornada).then(function(docRef) {

  });
 }

 private CrearEspecialidades(){
  for (let index = 0; index < this.especialidades.length; index++) {
    const especialidad = this.especialidades[index];
      this.usuarioServ.CrearEspecialidadesEnBD(especialidad).then(function(docRef) {
    });
  }
 }

 loadFoto(e){
   this.fileName = e.target.files[0].name;
  this.foto = e.target.files[0];   //para obtener la imagen del archivo.
 }
 mostrarMensajeExito() {
  this.toastr.success("Registro Completado!");
}
mostrarMensajeError(mensaje){
  this.toastr.error("Ocurrio un error: "+mensaje);
}

CargarObjJornada(){
  for (let index = 0; index < this.seleccionDiasDesemana.length; index++) {
    const dia = this.seleccionDiasDesemana[index];
    switch(dia){
      case '1':
        this.jornada.lunes=true;
      break;
      case '2':
        this.jornada.martes=true;
      break;
      case '3':
        this.jornada.miercoles=true;
      break;
      case '4':
        this.jornada.jueves=true;
      break;
      case '5':
        this.jornada.viernes=true;
      break;
      case '6':
        this.jornada.sabado=true;
      break;
      case '7':
        this.jornada.domingo=true;
      break;    
    } 
  }

}
CargarObjEspecialidades(){
// console.log(this.listaEspecialidades);
for (let index = 0; index < this.listaEspecialidades.length; index++) {
  const especialidad = this.listaEspecialidades[index];
  var nuevaEspecialidad = new Especialidad();
  nuevaEspecialidad.idProfesional= this.usuario.mail;
  nuevaEspecialidad.especialidad = especialidad;
  this.especialidades.push(nuevaEspecialidad);
}
// console.log(this.jornada); 
}
CargarListaHorarios(){
  this.listaHorarios= new Array<string>();
  var horaEntrada = "00:00:00";
  var horaSalida = "24:00:00";
  var pieces = horaEntrada.split(':');
  var piezaSalida = horaSalida.split(':');
  var horaEntradaInt, minute, second;
  var horaSalidaInt;

if(pieces.length === 3) {
  horaEntradaInt = parseInt(pieces[0], 10);
  minute = parseInt(pieces[1], 10);
  second = parseInt(pieces[2], 10);
}
horaSalidaInt = parseInt(piezaSalida[0], 10);

  for (let index = horaEntradaInt; index < horaSalidaInt; index++) {
    const element = horaEntradaInt;
    if(element!=13){
      var horario = <string>index + ":" + "00"+ ":" + "00";
      this.listaHorarios.push(horario);
    }
  }
}
onHorarioSalida(e){

}
onHorarioEntrada(e){

}
checkValue(event){
  this.checkProfesional = !event.target.checked;        
}
onDiaSeleccionado(event){
  // console.log(event.value);
}
EnviarRevision(){
  
}
}

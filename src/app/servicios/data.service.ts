import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Usuario } from '../clases/usuario';
import { Turno } from '../clases/turno';
import { Especialidad } from '../clases/especialidad';
import { Jornada } from '../clases/jornada';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private docRefId:string="";

  constructor(private dataStore:AngularFirestore,private toastr:ToastrService) { }

  public getAll(entidad):Observable<any[]>{

    
    return this.dataStore.collection(entidad).snapshotChanges().pipe(
      map( actions=> 
        actions.map(a=>{
          const data = <Usuario>a.payload.doc.data();
          // console.log(a.payload.doc.id, " => ", a.payload.doc.data());
          const id = a.payload.doc.id;
          data.id = a.payload.doc.id;
          return data;
        }))
    );
  }
  public PostEspecialidad(especialidad:Especialidad){
    return this.dataStore.collection("especialidades").add({
      idProfesional:especialidad.idProfesional,
      especialidad: especialidad.especialidad,     
  });
  }
  public PostJornada(jornada:Jornada){
    return this.dataStore.collection("jornadas").add({
      idProfesional: jornada.idProfesional == null ? "s/p" : jornada.idProfesional,
      horarioEntrada:jornada.horarioEntrada,
      horarioSalida: jornada.horarioSalida,
      lunes: jornada.lunes == null ? false : true,
      martes:jornada.martes == null ? false : true,
      miercoles:jornada.miercoles == null ? false : true,
      jueves:jornada.jueves == null ? false : true,
      viernes:jornada.viernes == null ? false : true,
      sabado:jornada.sabado == null ? false : true,
      domingo:jornada.domingo == null ? false : true    
  });
  }
  //Busca el document reference de Firebase de la coleccion y actualiza el usuario
  public UpdateUsuario(usuario:Usuario){
    var docId = "";
    return this.dataStore.collection("usuarios").snapshotChanges().subscribe((data)=> {
      data.map((actions=> {
        var usuariofb = <Usuario>actions.payload.doc.data();
        
        if(usuariofb.mail == usuario.mail){
          // console.log("encontrado!!",actions.payload.doc.id);
          this.docRefId = actions.payload.doc.id; 
          // console.log(this.docRefId);
          // console.log(actions.payload.doc.id);
          var docRef = this.dataStore.collection("usuarios").doc(this.docRefId);
          docRef.update({activo:true}).then(
            (res)=>this.mostrarMensajeExito("Usuario Actualizado!")
            ).catch((resp)=>  this.mostrarMensajeError(resp));  
        }     
      }));
    });
  }
  mostrarMensajeError(mensaje){
    this.toastr.error("Ocurrio un error: "+mensaje);
  }
  public getByProperty<T>(parameter:string,value:string,entidad:string){   

    return this.dataStore.collection<T>(entidad, ref => ref.where(parameter,'==', value )).valueChanges();

  }
  public getByPrortyArray<T>(parameter:string,value:string,entidad:string){ 

    return this.dataStore.collection<T>(entidad, ref => ref.where(parameter,"array-contains", value )).valueChanges();
  }
  
  public PostTurno(turno:Turno){
    return this.dataStore.collection("turnos").add({
      fecha:turno.fecha,
      hora: turno.hora,
      paciente: turno.paciente,
      estado: turno.estado,
      especialista: turno.especialista,
      centro: "S/C",
      especialidad: turno.especialidad,
      observaciones: turno.observaciones
  });
  }
  public UpdateIdTurno(idTurno:string){
    var docRef = this.dataStore.collection("turnos").doc(idTurno);
    docRef.update({idTurno:idTurno});
  }
  public PostRegistroLogin(mailUsuario:string){
    var m = new Date();
    var strFecha =  m.getUTCDate() +"/"+ (m.getUTCMonth()+1) +"/"+  m.getUTCFullYear();
    var hora = m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
    
    return this.dataStore.collection("registro_login").add({
      usuario:mailUsuario,
      fecha:strFecha,
      hora:hora
  });
  }
  public PostUsuario(usuario:Usuario){
    // console.log(usuario);
    return this.dataStore.collection("usuarios").add({
      mail: usuario.mail,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      sexo: usuario.sexo,  
      fecha_nacimiento:usuario.fecha_nacimiento,
      activo:usuario.activo,
      foto:usuario.foto,
      roll: usuario.roll.toString()
  });
  }
  mostrarMensajeExito(mensaje:string) {
    console.log("pasa");
    this.toastr.success(mensaje);
  }
  public UpdateTurno(turno:Turno,estado:string){
    var docId = "";
    return this.dataStore.collection("turnos").snapshotChanges().subscribe((data)=> {
      data.map((actions=> {
        var turnoFb = <Turno>actions.payload.doc.data();
        // console.log("turno.especialista->",JSON.stringify(turno.especialista));
        // console.log("turnoFb.especialista->",JSON.stringify(turnoFb.especialista) );
        // console.log("turno.paciente->",turno.paciente);
        // console.log("turnoFb.paciente->",JSON.stringify(turnoFb.paciente));
        if(JSON.stringify(turno.especialista) == JSON.stringify(turnoFb.especialista) && turno.paciente== JSON.stringify(turnoFb.paciente)){

          // console.log("encontrado!!",actions.payload.doc.id);
          this.docRefId = actions.payload.doc.id; 
          // var fecha = new Date();
          var m = new Date();
          var dateString =  m.getUTCDate() +"/"+ (m.getUTCMonth()+1) +"/"+  m.getUTCFullYear() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
          var docRef = this.dataStore.collection("turnos").doc(this.docRefId);
          docRef.update({estado:estado,
                         fecha:dateString,
                        observaciones:turno.observaciones})
            .then(()=>{this.mostrarMensajeExito("Registro Actualizado")})
            .catch((resp)=>  this.mostrarMensajeError(resp)); 
        }     
      }));
    });
  }
  public UpdateTurnoByRefDoc(idDocRef:string,estado:string,observacion:string,fechaAct:string){
    var m = new Date();
    var dateString =  m.getUTCDate() +"/"+ (m.getUTCMonth()+1) +"/"+  m.getUTCFullYear();
    var timeString = m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();

    var docRef = this.dataStore.collection("turnos").doc(idDocRef);
          docRef.update({estado:estado,
                         fecha_actualizacion:dateString,
                         hora_actualizacion:timeString,
                        observaciones:observacion})
            .then(()=>{this.mostrarMensajeExito("Registro Actualizado")})
            .catch((resp)=>  this.mostrarMensajeError(resp)); 
  }
  }

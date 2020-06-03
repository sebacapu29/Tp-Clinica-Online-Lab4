import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Usuario } from '../clases/usuario';
import { Turno } from '../clases/turno';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private dataStore:AngularFirestore) { }

  public getAll(entidad):Observable<any[]>{

    
    return this.dataStore.collection(entidad).snapshotChanges().pipe(
      map( actions=> 
        actions.map(a=>{
          const data = a.payload.doc.data();
          // console.log(a.payload.doc.id, " => ", a data());
          // const id = a.payload.doc.id;
          return data;
        }))
    );
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
  public PostUsuario(usuario:Usuario){
    // console.log(usuario);
    return this.dataStore.collection("usuarios").add({
      mail: usuario.mail,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      sexo: usuario.sexo,  
      fecha_nacimiento:usuario.fecha_nacimiento,
      activo:'true',
      foto:usuario.foto,
      roll: usuario.roll.toString()
  });
  }
}

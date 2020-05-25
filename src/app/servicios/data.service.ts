import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Usuario } from '../clases/usuario';


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
  public getOne(entidad,id):Observable<any[]>{
    
    return this.dataStore.collection(entidad + "/" + id).snapshotChanges().pipe(
      map( actions=> 
        actions.map(a=>{
          const data = a.payload.doc.data();
          // const id = a.payload.doc.id;
          return data;
        }))
    );
  }
  
  public PostUsuario(usuario:Usuario){
    console.log(usuario);
    return this.dataStore.collection("usuarios").add({
      mail: usuario.mail,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      sexo: usuario.sexo,  
      fecha_nacimiento:usuario.fecha_nacimiento,
      activo:'true',
      foto:usuario.foto,
      roll:'0'
  });
  }
}

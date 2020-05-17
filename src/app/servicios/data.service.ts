import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


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
}

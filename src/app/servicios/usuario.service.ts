import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public userData:Observable<firebase.User>;

  constructor(private dataServ:DataService, private authServ:AngularFireAuth) {
      this.userData = authServ.authState;
   }

   obtenerUsuarios(){
    this.dataServ.getAll("usuarios").subscribe(res => 
      console.log(res));
   }
   obtenerUnUsuario(id){
    this.dataServ.getAll("usuarios").subscribe(res => 
      console.log(res));
   }
   login(usuario:Usuario){
     const { mail , clave } = usuario;//destructuring
     return this.authServ.signInWithEmailAndPassword(mail,clave);
   }
   logOut(){
     this.authServ.signOut();
   }
   IsLogIn(){
     return this.authServ.authState;
   }
}

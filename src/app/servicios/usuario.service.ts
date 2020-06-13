import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import { Usuario } from '../clases/usuario';
import { Jornada } from '../clases/jornada';
import { Especialidad } from '../clases/especialidad';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public userData:Observable<firebase.User>;

  constructor(private dataServ:DataService, private authServ:AngularFireAuth) {
      this.userData = authServ.authState;
   }

   obtenerUsuarios(){
    return this.dataServ.getAll("usuarios");
   }
   public AutorizarProfesional(usuario:Usuario){
     return this.dataServ.UpdateUsuario(usuario);    
   }
   CrearJornadaEnBD(jornada:Jornada){
    return this.dataServ.PostJornada(jornada);
   }
   public RegistrarLogueo(mailUsuario:string){
    return this.dataServ.PostRegistroLogin(mailUsuario);
   }
   CrearEspecialidadesEnBD(especialidad:Especialidad){
    return this.dataServ.PostEspecialidad(especialidad);
   }
   obtenerProfesionales(){
    return this.dataServ.getAll("usuarios");
   }
   obtenerUnProfesional(param,value){
    //  return this.dataServ.getOneByProperty(param,value);
   }  
   obtenerPorEntidadYParametros<T>(param,value,entidad){
    return this.dataServ.getByProperty<T>(param,value,entidad);
  }  
  obtenerEspecialidades<T>(param,value,entidad){
    return this.dataServ.getByPrortyArray<T>(param,value,entidad);
  }  
  ObtenerTodasLasEspecialidades<T>(){
    return this.dataServ.getAll("especialidades");
  }  
  obtenerJornadas(){
    return this.dataServ.getAll("jornadas");
   }
   CrearUsuarioEnBD(usuario:Usuario){
     return this.dataServ.PostUsuario(usuario);
   }
   ActualizarUsuarioID(id:string){
    return this.dataServ.UpdateUsuarioID(id);   
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
   registroAutentificado(mailUsuario:string,clave:string){
     return this.authServ.createUserWithEmailAndPassword(mailUsuario,clave);
   }
   
}

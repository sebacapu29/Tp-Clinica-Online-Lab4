import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:Usuario;
  confimarcionClave:string;
  uploadPercent:Observable<number>;

  constructor(private storage:AngularFireStorage, usuarioServ:UsuarioService) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
  }
Registrarme(){

}
loginUsuarioNuevo(){}

loadFoto(e){
  const id = Math.random().toString(36).substring(2);
  const file = e.target.files[0] //para obtener la imagen del archivo.
  const filePath = "imagenes/login";
   const ref= this.storage.upload(filePath,file);

   this.uploadPercent = ref.percentageChanges();  
 }
}

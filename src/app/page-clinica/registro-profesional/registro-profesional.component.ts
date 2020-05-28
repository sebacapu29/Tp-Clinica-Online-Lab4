import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-registro-profesional',
  templateUrl: './registro-profesional.component.html',
  styleUrls: ['./registro-profesional.component.css']
})
export class RegistroProfesionalComponent implements OnInit {

  usuario:Usuario;
  registrando:boolean;
  confimarcionClave:string;
  
  constructor() { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }
  EnviarRevision(){
    
  }
}

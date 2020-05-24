import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {

  @Output() onLogOut:EventEmitter<any>= new EventEmitter();
  esProfesional:boolean;
  esAdmin:boolean;
  esPaciente:boolean;
  esUsuaioLogueado:boolean;
  
  constructor(private usuarioServ:UsuarioService,private router:Router) {

   }

  ngOnInit(): void {
  }

  altaUsuario(){
    this.router.navigate(['Alta']);
  }
  
  listadoProfesionales(){
    this.router.navigate(['Listados','profesional']);
  }
  listadoPacientes(){
    this.router.navigate(['Listados','pacientes']);
  }
  listadoTurnos(){
    this.router.navigate(['Listados','turnos']);
  }
  atenderTurnos(){
    this.router.navigate(['AtenderTurnos']);
  }
  solicitarTurno(){
    this.router.navigate(['Turnos']);
  }
  salir(){
    this.usuarioServ.logOut();
    this.onLogOut.emit(false);
    this.router.navigate(['Login']);
  }
  inicio(){
    this.router.navigate(['']);
  }
}

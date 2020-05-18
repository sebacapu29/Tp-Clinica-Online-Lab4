import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {

  constructor( private usuarioServ:UsuarioService,private router:Router) { }

  ngOnInit(): void {
  }

  altaUsuario(){

  }
  
  listadoProfesionales(){

  }
  listadoPacientes(){

  }
  solicitarTurno(){
    
  }
  salir(){
    this.usuarioServ.logOut();
    this.router.navigate(['Login']);
  }
}

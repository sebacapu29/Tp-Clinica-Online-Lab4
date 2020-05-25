import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit , OnDestroy {

  @Output() onLogOut:EventEmitter<any>= new EventEmitter();
  @Input() usuarioMenu:Usuario;//0=paciente,1=profesional,2=admin
  esUsuaioLogueado:boolean;
  listUsuarios: Usuario[]=[];

  constructor(private usuarioServ:UsuarioService,private router:Router) {
   this.TraerTodos(this.listUsuarios);
   
   }
  ngOnDestroy(): void {
  }
  consulta(){
    console.log(this.usuarioMenu);
  }
  TraerTodos(listaUsuarios?:Usuario[]){
    this.usuarioServ.obtenerUsuarios().subscribe(res => 
     {
       this.listUsuarios = res;
       var mailUsuarioLogueado= localStorage.getItem("usuarioLogueadoMail");
       this.ObtenerUsuarioLoguado(mailUsuarioLogueado);
     }
     ); 
 }
 ObtenerUsuarioLoguado(mailUsuarioLogueado){     
  for (let index = 0; index < this.listUsuarios.length; index++) {
    const usuarioEnDB = this.listUsuarios[index]; 
    // console.log("usuarioDBMail",JSON.stringify(usuarioEnDB.mail));
    // console.log("mailLogueado",mailUsuarioLogueado)
    if(JSON.stringify(usuarioEnDB.mail).trim() === JSON.stringify(mailUsuarioLogueado).trim()){
      this.usuarioMenu = usuarioEnDB;          
      localStorage.setItem("imgUsuarioRegistrado",JSON.stringify(usuarioEnDB.foto));   
      break;
    }
  }
}
  ngOnInit(): void {
    this.usuarioServ.IsLogIn().subscribe(resp=>{  
      this.esUsuaioLogueado = resp!=null;
    });
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
    // this.usuarioMenu.roll=3;
    this.onLogOut.emit(false);
    this.router.navigate(['Login']);
  }
  inicio(){
    this.router.navigate(['']);
  }
}

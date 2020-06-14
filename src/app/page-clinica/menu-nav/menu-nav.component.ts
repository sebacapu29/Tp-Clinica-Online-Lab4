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
  @Output() onOcultarBanner:EventEmitter<any> = new EventEmitter();
  esUsuaioLogueado:boolean;
  listUsuarios: Usuario[]=[];

  constructor(private usuarioServ:UsuarioService,private router:Router) {
   
   
   }
  ngOnDestroy(): void {
  } 
  ngOnInit(): void {
    this.TraerTodos(this.listUsuarios);
    this.usuarioServ.IsLogIn().subscribe(resp=>{  
      this.esUsuaioLogueado = resp!=null;
    });
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
  public RegistroAdmin(){

  }
  

  altaUsuario(){
    this.router.navigate(['Alta']);   
  }
  
  listadoProfesionales(){
    this.router.navigate(['Listados','profesional']);  
  }
  listadoUsuarios(){
    this.router.navigate(['Listados','pacientes']);  
  }
  listarReportes(){
    this.router.navigate(['Reportes']);  
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
  IrAGraficos(){
    this.router.navigate(['Graficos']);  
  }
  salir(){
    this.usuarioServ.logOut();
    this.router.navigate(['Login']);
  }
  pendientes(){
    this.router.navigate(['Pendientes']);
  }
  inicio(){
    this.router.navigate(['Principal']);
  }
}

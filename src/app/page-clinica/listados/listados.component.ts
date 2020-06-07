import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TurnoService } from 'src/app/servicios/turno.service';
import { Turno } from 'src/app/clases/turno';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosComponent implements OnInit {

  mostrarListaPacientes:boolean;
  mostrarListaProfesionales:boolean;
  mostrarListaTurnos:boolean;
  listTurnosPaciente:Turno[];
  listaUsuarios:Usuario[];
  turnoParaDetalle:Turno;

  constructor( private route: ActivatedRoute,private turnoServ:TurnoService,private usuarioServ:UsuarioService) {  
    this.listaUsuarios = new Array<Usuario>();    
    this.usuarioServ.obtenerUsuarios().subscribe((resp)=>{
      if(resp!=null){
        // for (const key in resp) {
        //   if (resp.hasOwnProperty(key)) {
        //     const usuario = <Usuario>resp[key];
        //     if(usuario.foto!=null){
        //       this.listaUsuarios[key]=usuario;
        //     }
        //     else{
        //       this.listaUsuarios[key]=usuario;
        //       this.listaUsuarios[key].foto ="assets/imagenes/defaul-user.png";
        //       console.log(this.listaUsuarios[key]);                             
        //     }            
        //   }
        // }
      }
    })
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.limpiarMostrarListados();

      switch(params.get('tipo')){
        case 'profesional':
          this.mostrarListaProfesionales=true; 
        break;
        case 'pacientes':
          this.mostrarListaPacientes=true;
        break;
        case 'turnos':          
          this.ObtenerTodosLosTurnos();
          this.mostrarListaTurnos=true;
        break;
      }
    });
  }
  tomarTurnoParaDetalle(turno:Turno){
    console.log('tomarTurnoPdetalle',turno);
    this.turnoParaDetalle=turno;

  }
  limpiarMostrarListados(){
    this.mostrarListaPacientes =false;
    this.mostrarListaProfesionales=false;
    this.mostrarListaTurnos=false;
  }
  ObtenerTurnosPaciente(){
    var pacienteLogueado = localStorage.getItem("usuarioLogueadoMail");
    // console.log(JSON.stringify(pacienteLogueado));

    this.listTurnosPaciente = this.listTurnosPaciente.filter((turno)=>{
      
      if(JSON.stringify(turno.paciente)== JSON.stringify(pacienteLogueado)){
        turno.paciente = JSON.stringify(turno.paciente);
        return turno;
      }     
    });
    console.log(this.listTurnosPaciente);
  }
  ObtenerTodosLosTurnos(){
    this.turnoServ.ObtenerTurnos().subscribe(res=>{
      this.listTurnosPaciente = res;   
      
      this.ObtenerTurnosPaciente();
    });
  }
}

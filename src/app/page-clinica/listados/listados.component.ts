import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TurnoService } from 'src/app/servicios/turno.service';
import { Turno } from 'src/app/clases/turno';

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
  turnoParaDetalle:Turno;

  constructor( private route: ActivatedRoute,private turnoServ:TurnoService) {  
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

    this.listTurnosPaciente = this.listTurnosPaciente.map((turno)=>{
      
      if(JSON.stringify(turno.paciente)== JSON.stringify(pacienteLogueado)){
        
        return turno;
      }     
    })
  }
  ObtenerTodosLosTurnos(){
    this.turnoServ.ObtenerTurnos().subscribe(res=>{
      this.listTurnosPaciente = res;   
      this.ObtenerTurnosPaciente();
    });
  }
}

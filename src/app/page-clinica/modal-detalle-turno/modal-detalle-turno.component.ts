import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Turno } from 'src/app/clases/turno';
import { TurnoService } from 'src/app/servicios/turno.service';
import { Encuestas } from 'src/app/clases/encuestas';

@Component({
  selector: 'app-modal-detalle-turno',
  templateUrl: './modal-detalle-turno.component.html',
  styleUrls: ['./modal-detalle-turno.component.css']
})
export class ModalDetalleTurnoComponent implements OnInit {

  @Input() turnoSeleccionado:Turno;
  disabledCancelar:boolean=true;
  disabledAtender:boolean=true;
  disabledAceptarRechazar:boolean=false;
  listaPuntaje:string[]=['1','2','3','4','5'];
  encuesta:Encuestas;

  constructor(private turnoServ:TurnoService) { 
  this.encuesta = new Encuestas();
  this.encuesta.puntaje=5;
  }

  ngOnInit(): void {
    if(this.turnoSeleccionado.estado.toLocaleLowerCase()=="cancelado" 
    || this.turnoSeleccionado.estado.toLocaleLowerCase()=="rechazado"
    || this.turnoSeleccionado.estado.toLocaleLowerCase()=="atendido"){
      this.disabledAceptarRechazar=true;
    }
  }
  onAtenderTurno(){
    this.turnoSeleccionado.paciente= JSON.stringify(this.turnoSeleccionado.paciente);
    this.turnoServ.AtenderTurno(this.turnoSeleccionado,"Atendido");
  }
  onBorrarTurno(){
    
  }
  onAceptarTurno(){
    this.disabledAtender=false;
    this.disabledCancelar=false;
  }
  onRechazarTurno(){
    this.turnoServ.AtenderTurno(this.turnoSeleccionado,"Rechazado");
  }
  onCancelarTurno(){
    this.turnoServ.AtenderTurno(this.turnoSeleccionado,"Cancelado");
  }
}

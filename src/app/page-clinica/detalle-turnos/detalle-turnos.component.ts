import { Component, OnInit, Input } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TurnoService } from 'src/app/servicios/turno.service';
import { EncuestaPacienteComponent } from '../encuesta-paciente/encuesta-paciente.component';

@Component({
  selector: 'app-detalle-turnos',
  templateUrl: './detalle-turnos.component.html',
  styleUrls: ['./detalle-turnos.component.css']
})
export class DetalleTurnosComponent implements OnInit {

  @Input() turnoSeleccionado:Turno;
  @Input() disabledOperaciones:boolean=false;

  constructor(private modal:NgbModal,private turnoServ:TurnoService) { 
    this.turnoSeleccionado=new Turno();

  }

  ngOnInit(): void {
    
  }
  onHabilitarEncuesta(){
    const modalRef = this.modal.open(EncuestaPacienteComponent,{windowClass: 'modal-holder', centered: true});
    console.log(this.turnoSeleccionado);
    modalRef.componentInstance.idProfesional = this.turnoSeleccionado.idProfesional; 
  }
  onCancelarTurno(){
    this.turnoServ.AtenderTurno(this.turnoSeleccionado,"Rechazado");
  }
 
}

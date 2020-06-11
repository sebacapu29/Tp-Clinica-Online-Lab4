import { Component, OnInit, Input } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroEncuestaComponent } from '../registro-encuesta/registro-encuesta.component';

@Component({
  selector: 'app-detalle-turnos',
  templateUrl: './detalle-turnos.component.html',
  styleUrls: ['./detalle-turnos.component.css']
})
export class DetalleTurnosComponent implements OnInit {

  @Input() turnoSeleccionado:Turno;
  @Input() disabledOperaciones:boolean=false;

  constructor(private modal:NgbModal) { 
    this.turnoSeleccionado=new Turno();

  }

  ngOnInit(): void {
    
  }
  onHabilitarEncuesta(){
    const modalRef = this.modal.open(RegistroEncuestaComponent,{windowClass: 'modal-holder', centered: true});

  }
  onCancelarTurno(){
  }
}

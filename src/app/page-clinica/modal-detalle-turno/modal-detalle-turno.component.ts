import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Turno } from 'src/app/clases/turno';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-modal-detalle-turno',
  templateUrl: './modal-detalle-turno.component.html',
  styleUrls: ['./modal-detalle-turno.component.css']
})
export class ModalDetalleTurnoComponent implements OnInit {

  @Input() turnoSeleccionado:Turno;

  constructor(private turnoServ:TurnoService) { }

  ngOnInit(): void {
  }
  onAtenderTurno(){
    this.turnoServ.AtenderTurno(this.turnoSeleccionado);
  }
}

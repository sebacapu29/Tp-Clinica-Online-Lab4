import { Component, OnInit, Input } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-detalle-turnos',
  templateUrl: './detalle-turnos.component.html',
  styleUrls: ['./detalle-turnos.component.css']
})
export class DetalleTurnosComponent implements OnInit {

  @Input() turnoSeleccionado:Turno;
  constructor() { 
    this.turnoSeleccionado=new Turno();

  }

  ngOnInit(): void {
  }
  onModificar(){

  }
  onBorrarTurno(){

  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { TruncateTextoLargoPipe} from '../../pipes/truncate-texto-largo.pipe';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css']
})
export class TablaTurnosComponent implements OnInit {

  @Input() listaTurnos:Turno[];
  @Output() turnoSeleccionado:EventEmitter<Turno>= new EventEmitter<Turno>();

  constructor() { 
    this.listaTurnos=new Array<Turno>();
    
  }

  ngOnInit(): void {
  }
  onTurnoSeleccionado(turno:Turno){    
    this.turnoSeleccionado.emit(turno);
  }
  
}

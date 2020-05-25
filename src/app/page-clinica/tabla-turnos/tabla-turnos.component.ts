import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css']
})
export class TablaTurnosComponent implements OnInit {

  listaTurnos:Turno[];
  constructor() { }

  ngOnInit(): void {
  }
  onTurnoSeleccionada(turno){

  }
}

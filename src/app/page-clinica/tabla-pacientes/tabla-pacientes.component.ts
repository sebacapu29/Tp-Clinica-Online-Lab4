import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.css']
})
export class TablaPacientesComponent implements OnInit {

  listaPacientes:Usuario[]=[];
  constructor() { }

  ngOnInit(): void {
  }
  onPacienteSeleccionada(paciente:Usuario){

  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosComponent implements OnInit {

  mostrarListaPacientes:boolean;
  mostrarListaProfesionales:boolean;
  mostrarListaTurnos:boolean;

  constructor( private route: ActivatedRoute) {  
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
          this.mostrarListaTurnos=true;
        break;
      }
    });
  }
  limpiarMostrarListados(){
    this.mostrarListaPacientes =false;
    this.mostrarListaProfesionales=false;
    this.mostrarListaTurnos=false;
  }
}

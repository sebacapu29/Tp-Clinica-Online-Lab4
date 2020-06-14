import { Component, OnInit } from '@angular/core';
import { Encuestas } from 'src/app/clases/encuestas';

@Component({
  selector: 'app-encuesta-profesional',
  templateUrl: './encuesta-profesional.component.html',
  styleUrls: ['./encuesta-profesional.component.css']
})
export class EncuestaProfesionalComponent implements OnInit {

  encuesta:Encuestas;
  listaPuntaje:string[]=['1','2','3','4','5'];
  constructor() { 
    this.encuesta= new Encuestas();
    this.encuesta.puntaje=5;
  }

  ngOnInit(): void {
  }

}

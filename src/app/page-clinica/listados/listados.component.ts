import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosComponent implements OnInit {

  @Input() mostrarListaPacientes:boolean;
  @Input() mostrarListaProfesionales:boolean;

  constructor() {  
   }

  ngOnInit(): void {
  }

}

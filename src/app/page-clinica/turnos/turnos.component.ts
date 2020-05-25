import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  turno:Turno;
  
  constructor() { 
    this.turno=new Turno();
  }

  ngOnInit(): void {
  }
  onSubmit(){

  }
}

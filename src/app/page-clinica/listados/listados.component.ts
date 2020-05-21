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

  constructor( private route: ActivatedRoute) {  
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    
      if(params.get('tipo')=='profesional'){
        this.mostrarListaProfesionales=true;
        this.mostrarListaPacientes=false;
      }
      else{
        this.mostrarListaPacientes=true;
        this.mostrarListaProfesionales=false;
      }
    });
  }

}

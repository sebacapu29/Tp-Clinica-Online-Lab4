import { Component, OnInit } from '@angular/core';
import { Encuestas } from 'src/app/clases/encuestas';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registro-encuesta',
  templateUrl: './registro-encuesta.component.html',
  styleUrls: ['./registro-encuesta.component.css']
})
export class RegistroEncuestaComponent implements OnInit {

  encuesta:Encuestas;
  disabledAceptarRechazar:boolean;
  disabledOperaciones:boolean;
  listaPuntaje:string[]=['1','2','3','4','5'];
  constructor(private toastr:ToastrService,public activeModal:NgbActiveModal) { 
    this.encuesta= new Encuestas();
    this.encuesta.puntaje =5;
  }

  ngOnInit(): void {
  }
  onEnviarEncuesta(){

  }

}

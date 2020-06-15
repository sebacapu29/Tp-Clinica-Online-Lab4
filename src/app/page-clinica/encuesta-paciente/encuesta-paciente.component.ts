import { Component, OnInit, Input } from '@angular/core';
import { Encuestas } from 'src/app/clases/encuestas';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Profesional } from 'src/app/clases/Profesional';
import { TurnoService } from 'src/app/servicios/turno.service';
import { EncuestaProfesional } from 'src/app/clases/encuesta-profesional';
import { EncuestaService } from 'src/app/servicios/encuesta.service';

@Component({
  selector: 'app-encuesta-paciente',
  templateUrl: './encuesta-paciente.component.html',
  styleUrls: ['./encuesta-paciente.component.css']
})
export class EncuestaPacienteComponent implements OnInit {

  encuesta:EncuestaProfesional;
  disabledAceptarRechazar:boolean;
  disabledOperaciones:boolean;
  ingresando:boolean=false;
  @Input() idProfesional:string;
  enviando:boolean;

  listaPuntaje:string[]=['1','2','3','4','5'];
  constructor(private toastrService:ToastrService, private toastr:ToastrService,public activeModal:NgbActiveModal,private encuestaService:EncuestaService) { 
    this.encuesta= new EncuestaProfesional();
    this.encuesta.puntaje =5;
  }

  ngOnInit(): void {
  }
  onEnviarEncuesta(){
    this.enviando=true;
    var m = new Date();
    var dateString =  m.getUTCDate() +"/"+ (m.getUTCMonth()+1) +"/"+  m.getUTCFullYear();
    this.encuesta.idProfesional = this.idProfesional;
    this.encuesta.fecha=dateString;
    this.encuesta.tipo="Encuesta a Profesional";

    this.encuestaService.CalificarProfesional(this.encuesta).then((resp)=>{
      this.enviando=false;
      this.toastrService.success("Encuesta registrada","Encuestas");
    }).catch((err)=>{this.enviando=false,this.toastrService.error(err,"Encuestas");});
  }
}

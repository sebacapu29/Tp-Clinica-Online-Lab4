import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { DIAS_SEMANA } from 'src/app/clases/constantes';
import {DiaSemanaPipe} from '../../pipes/dia-semana.pipe';
import { Jornada } from 'src/app/clases/jornada';
import { Especialidad } from 'src/app/clases/especialidad';
@Component({
  selector: 'app-registro-profesional',
  templateUrl: './registro-profesional.component.html',
  styleUrls: ['./registro-profesional.component.css']
})
export class RegistroProfesionalComponent implements OnInit {

  usuario:Usuario;
  registrando:boolean;
  confimarcionClave:string;
  checkProfesional:boolean=true;
  checks:any;
  jornada:Jornada;
  especialidad:Especialidad;  
  listaDiasDeSemana:string[];
  listaHorarios:string[];
  @Output() onCargarJornada:EventEmitter<Jornada> = new EventEmitter<Jornada>();
  @Output() onCargarEspecialidad:EventEmitter<Especialidad> = new EventEmitter<Especialidad>();

  constructor() { 
    this.usuario = new Usuario();
    this.listaDiasDeSemana = DIAS_SEMANA;
    this.CargarListaHorarios();
  }
  CargarListaHorarios(){
    this.listaHorarios= new Array<string>();
    var horaEntrada = "00:00:00";
    var horaSalida = "24:00:00";
    var pieces = horaEntrada.split(':');
    var piezaSalida = horaSalida.split(':');
    var horaEntradaInt, minute, second;
    var horaSalidaInt;
  
  if(pieces.length === 3) {
    horaEntradaInt = parseInt(pieces[0], 10);
    minute = parseInt(pieces[1], 10);
    second = parseInt(pieces[2], 10);
  }
  horaSalidaInt = parseInt(piezaSalida[0], 10);
  
    for (let index = horaEntradaInt; index < horaSalidaInt; index++) {
      const element = horaEntradaInt;
      if(element!=13){
        var horario = <string>index + ":" + "00"+ ":" + "00";
        this.listaHorarios.push(horario);
      }
    }
  }
  onHorarioSalida(e){

  }
  onHorarioEntrada(e){

  }
  checkValue(event){
    this.checkProfesional = !event.target.checked;        
  }
  onDiaSeleccionado(event){
    console.log(event.value);
  }
  ngOnInit(): void {
  }
  EnviarRevision(){
    
  }
  cargarProfesional(){
    this.onCargarJornada.emit(this.jornada);
    this.onCargarEspecialidad.emit(this.especialidad);
  }
}

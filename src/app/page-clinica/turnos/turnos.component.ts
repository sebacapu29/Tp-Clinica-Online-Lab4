import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Especialidad } from 'src/app/clases/especialidad';
import { Centro } from 'src/app/clases/centro';
import { Jornada } from 'src/app/clases/jornada';
import { NgbCalendar, NgbDateParserFormatter, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TurnoService } from 'src/app/servicios/turno.service';
import { ESPECIALIDADES,DIAS_SEMANA } from '../../clases/constantes';
import { Profesional } from 'src/app/clases/profesional';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  turno:Turno;
  profesional:Usuario;
  listaProfesionales:Usuario[];
  usuarioLogueado:Usuario;
  objProfesionalSeleccionado:Usuario;  
  profesionalSeleccionado:string;
  centros:Centro;
  listaLocalidades:string[]=[];
  listaEspecialidades:string[]=[];
  listaDiasDeSemana:string[];
  listaHorarios:string[];
  listaDias:string[];
  especialidades:Especialidad[];
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  minDate:NgbDate| null;
  datesDisabled:boolean;
  toppings = new FormControl();
  displayedColumns: string[] = ['nombre', 'apellido', 'sexo', 'foto','seleccion'];
  dataSource:any[];

  model: NgbDateStruct;
  constructor(private usuarioServ:UsuarioService,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,private turnoServ:TurnoService) { 
    this.turno=new Turno();
    this.usuarioServ.obtenerPorEntidadYParametros<Usuario>("roll","1","usuarios").subscribe((response)=>{
      this.listaProfesionales = response;
      this.profesionalSeleccionado = response[0].nombre.toString();
    });
    this.objProfesionalSeleccionado = new Usuario();
    this.listaHorarios=new Array<string>("Seleccione Profesional");
    this.listaDias = new Array<string>();
    this.listaEspecialidades =new Array<string>("Seleccione Profesional");
    this.listaLocalidades =new Array<string>("Seleccione Profesional");    
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 0);       
    this.minDate=calendar.getToday();
    // console.log(ESPECIALIDADES);
    this.listaEspecialidades = ESPECIALIDADES;
    this.listaDiasDeSemana = DIAS_SEMANA;
  }
  IsDisabled= (date:NgbDate,current: {month:number}) =>{
  
    var diasNoHabilitados = this.calendar.getNext(this.calendar.getToday(), 'd', 15);
    var diaActual = this.calendar.getToday();

    if(date.month < diaActual.month){
      return true;
    }
    if(date.day < diaActual.day && date.month == diaActual.month){
      return true;
    }
    else if(date.day > diasNoHabilitados.day && diasNoHabilitados.month == date.month){
      return true;
    }
    else if(date.month > this.calendar.getNext(this.calendar.getToday(), 'm', 1).month){
      return true;
    }  
  }
  onProfesionalSeleccionado(event){
    this.onChangeEspecialidad(event.value.mail);
    this.rowSelected(null,event.value);
  }
  onDiaSeleccionado(e){

  }
  submitTurno(){

  }
esDiaLaborable(date: NgbDate){

  if(this.listaDias.length>0){
    for (let index = 0; index < this.listaDias.length; index++) {
      const element = this.listaDias[index];
      // console.log(element);
      // console.log(parseInt(element));
      if(this.calendar.getWeekday(date)== parseInt(element)){     
      return true;
      } 
    }
    return false;
  }
}
 
//   tomarProfesional(profesional:Usuario){
 
//   console.log(this.profesionalSeleccionado);
// }
onChangeEspecialidad(especialidadSeleccionada){

  // console.log(especialidadSeleccionada);
  var turnos = new Array<Turno>();
  var turno =new Turno();
  this.usuarioServ.obtenerPorEntidadYParametros<Especialidad>("especialidad",especialidadSeleccionada,"especialidades").subscribe((resp)=>{
   this.especialidades = resp;
   
  this.dataSource = this.listaProfesionales.filter((profesional)=> {
    for (let index = 0; index < this.especialidades.length; index++) {
      const element = this.especialidades[index];
      if(profesional.mail==element.idProfesional){
        // return {nombre:profesional.nombre,apellido:profesional.apellido,sexo:profesional.sexo};
        return profesional;
      }
    }
  });
  console.log(this.dataSource);
  });

}
rowSelected(event, row:Usuario){
  this.objProfesionalSeleccionado.apellido = row.apellido;
  this.seleccionJornada(row.mail);

}
seleccionJornada(mailProfesional){

  this.usuarioServ.obtenerPorEntidadYParametros<Jornada>("idProfesional",mailProfesional,"jornadas").subscribe((response)=>{
    // this.especialidades = response[0];
    console.log(response);
    this.listaDias = response[0].dias.split(",");
    console.log(this.listaDias);
    var horaEntrada = response[0].horarioEntrada;
    var horaSalida = response[0].horarioSalida;
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
    // console.log(this.listaHorarios);
  
  });
}
  ngOnInit(): void {
  }
  onSubmit(){

  }
  onDateSelection(date: NgbDate) {
 
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }
 
}

import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Especialidad } from 'src/app/clases/especialidad';
import { Centro } from 'src/app/clases/centro';
import { Jornada } from 'src/app/clases/jornada';
import { NgbCalendar, NgbDateParserFormatter, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
  profesionalSeleccionado:string;
  centros:Centro;
  listaLocalidades:string[]=[];
  listaEspecialidades:string[]=[];
  listaHorarios:string[];
  listaDias:string[];
  especialidades:Especialidad;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  minDate:NgbDate| null;
  // markDisabled:boolean;
  datesDisabled:boolean;
  // isDisabled = (date: NgbDate, current: {month: number, year: number}) => date.month !== current.month;
  isFrom = date => this.calendar.getToday();;
  isTo = date => this.calendar.getNext(this.calendar.getToday(), 'd', 3); 
  equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

  model: NgbDateStruct;
  constructor(private usuarioServ:UsuarioService,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) { 
    this.turno=new Turno();
    this.usuarioServ.obtenerPorEntidadYParametros<Usuario>("roll","1","usuarios").subscribe((response)=>{
      this.listaProfesionales = response;
      this.profesionalSeleccionado = response[0].nombre.toString();
    });
    this.listaHorarios=new Array<string>("Seleccione Profesional");
    this.listaDias = new Array<string>();
    this.listaEspecialidades =new Array<string>("Seleccione Profesional");
    this.listaLocalidades =new Array<string>("Seleccione Profesional");    
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 0);       
    this.minDate=calendar.getToday();
        // console.log(calendar.getWeekday(calendar.getToday()));
        // calendar.
        
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
 
  tomarProfesional(profesional:Usuario){
    // console.log(profesional);

    
  // this.profesionalSeleccionado=profesional;
  console.log(this.profesionalSeleccionado);
}
onChange(nombre){

  var mailProfesional = this.listaProfesionales.find(profesional=> { if(JSON.stringify(profesional.nombre)==JSON.stringify(nombre)) {return profesional;}} );

this.usuarioServ.obtenerPorEntidadYParametros<Centro>("idProfesional",mailProfesional.mail,"centros").subscribe((response)=>{
  this.centros = response[0]; 
  this.listaLocalidades = this.centros !=null ? this.centros.localidad : new Array<string>();    

});
this.usuarioServ.obtenerPorEntidadYParametros<Especialidad>("idProfesional",mailProfesional.mail,"especialidades").subscribe((response)=>{
  this.especialidades = response[0];
  this.listaEspecialidades = this.especialidades != null ? this.especialidades.especialidad :  new Array<string>();
});
this.usuarioServ.obtenerPorEntidadYParametros<Jornada>("idProfesional",mailProfesional.mail,"jornadas").subscribe((response)=>{
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
    // if (!this.fromDate && !this.toDate) {
    //   this.fromDate = date;
    // } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
    //   this.toDate = date;
    // } else {
    //   this.toDate = null;
    //   this.fromDate = date;
    // }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  addRangeDate(fromDate:NgbDateStruct,toDate:NgbDateStruct)
  {
      //We get the getTime() of the dates from and to
      let from=new Date(fromDate.year+"-"+fromDate.month+"-"+fromDate.day).getTime();
      let to=new Date(toDate.year+"-"+toDate.month+"-"+toDate.day).getTime();
      for (let time=from;time<=to;time+=(24*60*60*1000)) //add one day
      {
          let date=new Date(time);
          //javascript getMonth give 0 to January, 1, to February...
          this.addDate({year:date.getFullYear(),month:date.getMonth()+1,day:date.getDate()});
      }   
      // this.datesSelectedChange.emit(this.datesSelected);
  }
  addDate(date:NgbDateStruct)
  {
      // let index=this.datesSelected.findIndex(f=>f.day==date.day && f.month==date.month && f.year==date.year);
      // if (index>=0)       //If exist, remove the date
      //   this.datesSelected.splice(index,1);
      // else   //a simple push
      //   this.datesSelected.push(date);
    }
}

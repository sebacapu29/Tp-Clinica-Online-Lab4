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
  listaJornadas:Jornada[];   
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
    this.usuarioServ.obtenerJornadas().subscribe((response)=>{
      this.listaJornadas = response;
    });
    
    this.objProfesionalSeleccionado = new Usuario();
    this.listaHorarios=new Array<string>("Seleccione Profesional");
    this.listaDias = new Array<string>();
    this.listaEspecialidades =new Array<string>("Seleccione Profesional");
    this.listaLocalidades =new Array<string>("Seleccione Profesional");    
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 0);       
    this.minDate=calendar.getToday();  
    this.listaEspecialidades = ESPECIALIDADES;
    this.listaDiasDeSemana = DIAS_SEMANA;
  }
  IsDisabled = (date:NgbDate,current: {month:number}) =>{
  
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
    this.buscarProfesionalPorId(event.value.mail);
    this.rowSelected(null,event.value);
    this.listaDiasDeSemana = new Array<string>();
    this.listaDiasDeSemana = DIAS_SEMANA;
  }
  
  SubmitTurno(){

  }
esDiaLaborable(date: NgbDate){

  if(this.listaDias.length>0){
    for (let index = 0; index < this.listaDias.length; index++) {
      const element = this.listaDias[index]; 
      if(this.calendar.getWeekday(date)== parseInt(element)){     
      return true;
      } 
    }
    return false;
  }
}
//Obtengo las especialidades que tienen idProfesional, luego recorro la lista de profesionales buscando esos ids de esas especialidades
onChangeEspecialidad(especialidadSeleccionada){

  this.listaDias = new Array<string>();  
  this.listaDiasDeSemana = new Array<string>();//Refresco comboDiasDeSemana
  this.listaDiasDeSemana = DIAS_SEMANA;
  var turnos = new Array<Turno>();
  var turno =new Turno();
  this.usuarioServ.obtenerPorEntidadYParametros<Especialidad>("especialidad",especialidadSeleccionada,"especialidades").subscribe((resp)=>{
   this.especialidades = resp;
   
  this.dataSource = this.listaProfesionales.filter((profesional)=> {
    for (let index = 0; index < this.especialidades.length; index++) {
      const element = this.especialidades[index];
      // console.log("profesional.mail",profesional.mail);
      // console.log("element.idProfesional",element.idProfesional);
      if(JSON.stringify(profesional.mail)== JSON.stringify(element.idProfesional)){
        return profesional;
      }
    }
  });
  });

}
//
buscarProfesionalPorId(idProfesional){

  var turnos = new Array<Turno>();
  var turno =new Turno();
  this.listaDias= Array<string>();
  this.dataSource = this.listaProfesionales.filter((profesional)=> {       
      if(JSON.stringify(profesional.mail)== JSON.stringify(idProfesional)){
        return profesional;
      }    
  });
}
rowSelected(event, row:Usuario){
  this.objProfesionalSeleccionado.apellido = row.apellido;
  this.seleccionJornada(row.mail);

}
seleccionJornada(mailProfesional){

  this.usuarioServ.obtenerPorEntidadYParametros<Jornada>("idProfesional",mailProfesional,"jornadas").subscribe((response)=>{       
    if(response.length>0){

      if(response!=null){
        this.SeleccionarDiasParaCalendario(response[0]);
      }
      // this.FiltrarListaProfesionalesPorDias(response);
      // this.listaDias = response[0].dias.split(",");//modificar
      // console.log(this.listaDias);
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
  }
  });
}
SeleccionarDiasParaCalendario(jornada:Jornada){
    this.listaDias = new Array<string>();
    var indexDias=  this.listaDias.length==0? 1: this.listaDias.length;
    console.log(jornada);
      if(jornada.lunes){
        this.listaDias[indexDias-1] ="1";
        indexDias++;
      }
      if(jornada.martes){
        this.listaDias[indexDias-1] ="2";
        indexDias++;
      }
      if(jornada.miercoles){
        this.listaDias[indexDias-1] ="3";
        indexDias++;
      }
      if(jornada.jueves){
        this.listaDias[indexDias-1] ="4";
        indexDias++;
      }  
      if(jornada.viernes){
        this.listaDias[indexDias-1] ="5";
        indexDias++;
      }
      if(jornada.sabado){
        this.listaDias[indexDias-1] ="6";
        indexDias++;
      }
      if(jornada.domingo){
        this.listaDias[indexDias-1] ="7";
        indexDias++;
      }  
}
onDiaSeleccionado(event){  
  // console.log(event.value);  
  if(event.value.length>0){
    this.FiltrarListaProfesionalesPorDias(event.value);  
  }
}
  FiltrarListaProfesionalesPorDias(aSeleccion:string[]){
    // console.log("d",this.listaJornadas);
    this.dataSource = new Array<Usuario>();//Refresca la tabla  
    for (let index = 0; index < this.listaJornadas.length; index++) {
      const jornada = this.listaJornadas[index];
      // console.log(aSeleccion);
            
      for (let iSeleccion = 0; iSeleccion < aSeleccion.length; iSeleccion++) {
        const diaSeleccionado = aSeleccion[iSeleccion];
            
        switch(diaSeleccionado){
          case '1':
            if(jornada.lunes){
              this.BuscarProfesionalPorID(jornada.idProfesional);
            }
          break;
          case '2':
            if(jornada.martes){
               this.BuscarProfesionalPorID(jornada.idProfesional);
            }
          break;
          case '3':
            if(jornada.miercoles){
              this.BuscarProfesionalPorID(jornada.idProfesional);
            }
          break;
          case '4':
            if(jornada.jueves){
              this.BuscarProfesionalPorID(jornada.idProfesional);
            }
          break;
          case '5':
            if(jornada.viernes){
               this.BuscarProfesionalPorID(jornada.idProfesional);
            }
          break;
          case '6':
            if(jornada.sabado){
               this.BuscarProfesionalPorID(jornada.idProfesional);
            }
          break;
          case '7':
            if(jornada.domingo){
              this.BuscarProfesionalPorID(jornada.idProfesional);
            }
          break;    
        }
      }
      
    }
  }
  BuscarProfesionalPorID(idProfesional:string){
    
    var listaFiltrada = new Array<Usuario>();
    var iListaFiltrada=0;
    for (let index = 0; index < this.listaProfesionales.length; index++) {
      const profesional = this.listaProfesionales[index];
      if(profesional.mail==idProfesional){
        listaFiltrada[iListaFiltrada]=profesional;
        iListaFiltrada++;
      }      
    }
    this.dataSource= listaFiltrada;
  // console.log("adasdasdsad");
  //   return index.toString();
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

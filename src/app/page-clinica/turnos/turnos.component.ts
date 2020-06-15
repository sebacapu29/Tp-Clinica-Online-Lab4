import { Component, OnInit, ViewChild } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { Profesional } from 'src/app/clases/Profesional';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Especialidad } from 'src/app/clases/especialidad';
import { Centro } from 'src/app/clases/centro';
import { Jornada } from 'src/app/clases/jornada';
import { NgbCalendar, NgbDateParserFormatter, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TurnoService } from 'src/app/servicios/turno.service';
import { ESPECIALIDADES,DIAS_SEMANA } from '../../clases/constantes';
import { FormControl } from '@angular/forms';
import { error } from '@angular/compiler/src/util';
import { DiaSemanaPipe} from '../../pipes/dia-semana.pipe';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  turno:Turno;
  profesional:Profesional;
  listaProfesionales:Profesional[];
  ProfesionalLogueado:Profesional;
  objProfesionalSeleccionado:Profesional; 
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
  especialidad:Especialidad;
  diaSeleccionado:any;
  horarioSeleccionado:string;
  registrando:boolean=false;
  toppings = new FormControl();
  fecha:NgbDate;
  displayedColumns: string[] = ['nombre', 'apellido', 'especialidad','diaSemana','seleccion'];
  dataSource:MatTableDataSource<Profesional>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  model: NgbDateStruct;
  constructor(private usuarioServ:UsuarioService,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,private turnoServ:TurnoService,private toastr:ToastrService) { 
    this.turno=new Turno();
    this.usuarioServ.obtenerPorEntidadYParametros<Profesional>("roll","1","usuarios").subscribe((response)=>{
      this.listaProfesionales = response;
      this.profesionalSeleccionado = response[0].nombre.toString();
      this.dataSource = response != null? new MatTableDataSource(this.listaProfesionales) : new MatTableDataSource(new Array<Profesional>());      
      this.listaHorarios = new Array<string>();
      
        this.usuarioServ.obtenerJornadas().subscribe((response)=>{
          this.listaJornadas = response;

              this.usuarioServ.ObtenerTodasLasEspecialidades().subscribe((response)=>{        
              this.especialidades = response;
              var listaFiltrada = new Array<Profesional>();
              var indexLiFiltrada =0;
              // console.log("res",response);
              if(response!=null){
                for (const keyProfesional in this.listaProfesionales) {
                  var profesional = this.listaProfesionales[keyProfesional];  
                  for (const key in this.especialidades) {
                    var especialidad = this.especialidades[key]; 
                    
                    if(profesional.mail == especialidad.idProfesional){
            
                      var nuevoProfesional = new Profesional();
                       nuevoProfesional.nombre = profesional.nombre;
                       nuevoProfesional.apellido = profesional.apellido;
                       nuevoProfesional.mail = profesional.mail;
                       nuevoProfesional.activo = profesional.activo;
                       nuevoProfesional.foto = profesional.foto;
                       nuevoProfesional.roll = profesional.roll;
                       nuevoProfesional.fecha_nacimiento = profesional.fecha_nacimiento;
                       nuevoProfesional.sexo = profesional.sexo;
                       nuevoProfesional.especialidad = especialidad;
                      listaFiltrada[indexLiFiltrada]= nuevoProfesional;
                      indexLiFiltrada++;
                    }
                  }
                }             
              }
              for (const keyP in listaFiltrada) {  
                const profesional = listaFiltrada[keyP];
                for (const keyJ in this.listaJornadas) {
                  if (this.listaJornadas.hasOwnProperty(keyJ)) {
                    const jornada = this.listaJornadas[keyJ];
                    // console.log(jornada.idj)
                    if(jornada.idProfesional == profesional.mail){
                      listaFiltrada[keyP].jornada = jornada;
                      listaFiltrada[keyP].dias = this.GetFormatoDias(jornada);
                    }
                  }
                }       
              }
              this.dataSource = new MatTableDataSource(listaFiltrada);
              this.InicializarPaginator();
            });
          });
      }
    );    
    this.objProfesionalSeleccionado = new Profesional();
  
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 0);       
    this.minDate=calendar.getToday();  
    this.listaEspecialidades = ESPECIALIDADES;
    this.listaDiasDeSemana = DIAS_SEMANA;
    this.especialidad = new Especialidad();
  }
  GetFormatoDias(jornada:Jornada){
    var strDias="";
    this.listaDias = new Array<string>();

    if(jornada.lunes){
      strDias = strDias.concat("Lu,");
    }
    if(jornada.martes){
      strDias = strDias.concat("Ma,");
    }
    if(jornada.miercoles){
      strDias = strDias.concat("Mie,");
    }
    if(jornada.jueves){
      strDias = strDias.concat("Jue,");
    }  
    if(jornada.viernes){
      strDias = strDias.concat("Vie,");
    }
    if(jornada.sabado){
      strDias = strDias.concat("Sa,");
    }
    if(jornada.domingo){
      strDias = strDias.concat("Do");
    }  
    return strDias;
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
  // onProfesionalSeleccionado(event){
  //   // this.buscarProfesionalPorId(event.value.mail);
  //   this.BuscarProfesionalPorID(event.value.mail)
  //   this.rowSelected(null,event.value);
  //   this.listaDiasDeSemana = new Array<string>();
  //   this.listaDiasDeSemana = DIAS_SEMANA;
  // }
  
esDiaLaborable(date: NgbDate){
  this.listaDias= this.listaDias == null? new Array<string>() : this.listaDias;

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
// onChangeEspecialidad(especialidadSeleccionada){

//   this.listaDias = new Array<string>();  
//   this.listaDiasDeSemana = new Array<string>();//Refresco comboDiasDeSemana
//   this.listaDiasDeSemana = DIAS_SEMANA;
//   var turnos = new Array<Turno>();
//   var turno = new Turno();
//   this.usuarioServ.obtenerPorEntidadYParametros<Especialidad>("especialidad",especialidadSeleccionada,"especialidades").subscribe((resp)=>{
//    this.especialidades = resp;
   
//   var listaFiltrada =  this.listaProfesionales.filter((profesional)=> {
//     for (let index = 0; index < this.especialidades.length; index++) {
//       const element = this.especialidades[index];
//       // console.log("profesional.mail",profesional.mail);
//       // console.log("element.idProfesional",element.idProfesional);
//       if(JSON.stringify(profesional.mail)== JSON.stringify(element.idProfesional)){
//         return profesional;
//       }
//     }
//     this.dataSource = new MatTableDataSource(listaFiltrada);
//   });
//   });
// }
//
buscarProfesionalPorId(idProfesional){

  var turnos = new Array<Turno>();
  var turno =new Turno();
  this.listaDias= Array<string>();
  var listaFiltrada =  this.listaProfesionales.filter((profesional)=> {       
      if(JSON.stringify(profesional.mail)== JSON.stringify(idProfesional)){
        return profesional;
      }    
  });
  this.dataSource = new MatTableDataSource(listaFiltrada);
}
rowSelected(event, row:Profesional){
  this.objProfesionalSeleccionado.apellido = row.apellido;
  this.objProfesionalSeleccionado.mail = row.mail;
  this.turno.especialidad = row.especialidad.especialidad;
  console.log(row.dias);
  this.seleccionJornada(row);  
}

seleccionJornada(profesional:Profesional){
  this.listaHorarios=new Array<string>();

  // this.usuarioServ.obtenerPorEntidadYParametros<Jornada>("idProfesional",mailProfesional,"jornadas").subscribe((response)=>{       
    
      var horaEntrada =  profesional.jornada.horarioEntrada;
      var horaSalida = profesional.jornada.horarioSalida;
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
    this.dataSource = new MatTableDataSource(new Array<Profesional>());//Refresca la tabla  
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
    console.log(idProfesional);
    var listaFiltrada = new Array<Profesional>();
    var iListaFiltrada=0;


    for (let index = 0; index < this.listaProfesionales.length; index++) {
      const profesional = this.listaProfesionales[index];
      if(profesional.mail==idProfesional){
        for (let index2 = 0; index2 < this.especialidades.length; index2++) {
          const especialidad = this.especialidades[index2];     
              listaFiltrada[iListaFiltrada]=profesional;
              
        }
      }      
    }
    this.dataSource= new MatTableDataSource(listaFiltrada);
  }
  ngOnInit(): void {

  }
  InicializarPaginator(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  SubmitTurno(){   
    // var nuevoTurno = new Turno();
    var mailUsuario = localStorage.getItem("usuarioLogueadoMail");
    this.turno.especialista = this.objProfesionalSeleccionado.mail;
    this.turno.idProfesional = this.objProfesionalSeleccionado.id;
    this.turno.estado= "Activo";
    this.turno.observaciones = "S/O";
    this.turno.paciente = mailUsuario;  
    this.registrando=true;  
    this.turno.fecha = this.fecha.day + "/" + this.fecha.month + "/" + this.fecha.year; 
    // console.log(this.turno.fecha);
    // console.log(this.turno);
   
    this.turnoServ.pedirTurno(this.turno).then((response=>{
      // alert("turno solicitado");
      this.toastr.success("Turno Solicitado!","Turnos");
      // console.log(response.id);
      this.turnoServ.ActualizarIdTurno(response.id);
      this.registrando=false;
    })
  ).
  catch(((err)=> {this.toastr.error(err,"Turnos");; this.registrando=false;}));
  }  
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

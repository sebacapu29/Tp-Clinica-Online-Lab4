import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Turno } from 'src/app/clases/turno';
import { TurnoService } from 'src/app/servicios/turno.service';
import { Encuestas } from 'src/app/clases/encuestas';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/clases/usuario';
import { Dinamicos } from 'src/app/clases/dinamicos';
import { Router } from '@angular/router';
import { HistorialMedico } from 'src/app/clases/historial-medico';

@Component({
  selector: 'app-modal-detalle-turno',
  templateUrl: './modal-detalle-turno.component.html',
  styleUrls: ['./modal-detalle-turno.component.css']
})
export class ModalDetalleTurnoComponent implements OnInit {

  @Input() turnoSeleccionado:Turno;
  disabledCancelar:boolean=true;
  disabledAtender:boolean=true;
  disabledAceptarRechazar:boolean=false;
  pulsaOpcion:boolean;
  imgFoto:string;
  nombreCompleto:string;
  listaDinamicos:Array<Dinamicos>;
  historialMedico:HistorialMedico;
  pacienteDetalle:Usuario;
  registrandoTurno:boolean=false;

  constructor(private router:Router,private turnoServ:TurnoService,private usuarioService:UsuarioService,private activeModal:NgbActiveModal) { 
 
  this.listaDinamicos = new Array<Dinamicos>();
  this.listaDinamicos.push(new Dinamicos("edad",""));
  this.listaDinamicos.push(new Dinamicos("temperatura",""));
  this.listaDinamicos.push(new Dinamicos("presion",""));
  this.historialMedico = new HistorialMedico();
  }

  ngOnInit(): void {
    if(this.turnoSeleccionado.estado.toLocaleLowerCase()=="cancelado" 
    || this.turnoSeleccionado.estado.toLocaleLowerCase()=="rechazado"
    || this.turnoSeleccionado.estado.toLocaleLowerCase()=="atendido"){
      this.disabledAceptarRechazar=true;
    }
    // console.log(this.turnoSeleccionado.paciente);
    this.usuarioService.obtenerPorEntidadYParametros<Usuario>("mail",this.turnoSeleccionado.paciente,"usuarios").subscribe((resp)=>{
      // console.log(resp);
      if(resp!=null){
        this.imgFoto = resp[0].foto;
        this.nombreCompleto = resp[0].nombre + " " + resp[0].apellido;
        this.pacienteDetalle = resp[0];
      }
    });
  }
 
  onAgregarDatos(){
    this.listaDinamicos.push(new Dinamicos("Ingrese Prop","Ingrese Valor"));    
    
  }
  onAtenderTurno(){
    this.registrandoTurno=true;
    this.turnoSeleccionado.paciente= JSON.stringify(this.turnoSeleccionado.paciente);
    this.turnoServ.AtenderTurnoProfesional(this.turnoSeleccionado,"Atendido");
    this.CargarHistorialMedico();
    this.turnoServ.ActualizarHistorialMed(this.historialMedico).then(()=>{
      this.registrandoTurno=false;
    });
  }
  CargarHistorialMedico(){
    var m = new Date();
    var dateString =  m.getUTCDate()-1 +"/"+ (m.getUTCMonth()+1) +"/"+  m.getUTCFullYear();
    this.historialMedico.idTurno= this.turnoSeleccionado.idTurno;  
    this.historialMedico.datos = this.listaDinamicos;
      this.historialMedico.fecha = dateString;
      this.historialMedico.idPaciente = this.pacienteDetalle.id;
      this.historialMedico.profesional = this.turnoSeleccionado.especialista;
      this.historialMedico.observaciones = this.turnoSeleccionado.observaciones;
  }
  onBorrarTurno(){
    
  }
  onAceptarTurno(){
    this.pulsaOpcion=true;
  }
  onRechazarTurno(){
    this.turnoServ.AtenderTurno(this.turnoSeleccionado,"Rechazado");
  }
  onCancelarTurno(){
    this.turnoServ.AtenderTurno(this.turnoSeleccionado,"Cancelado");
  }
  IrAEncuesta(){
    this.activeModal.dismiss();
    this.router.navigate(['Encuesta']);
  }
}

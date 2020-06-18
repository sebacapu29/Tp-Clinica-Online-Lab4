import { Component, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TurnoService } from 'src/app/servicios/turno.service';
import { Turno } from 'src/app/clases/turno';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleTurnosComponent } from '../detalle-turnos/detalle-turnos.component';
import { ModalDetalleTurnoComponent } from '../modal-detalle-turno/modal-detalle-turno.component';

@Component({
  selector: 'app-atencion-turnos',
  templateUrl: './atencion-turnos.component.html',
  styleUrls: ['./atencion-turnos.component.css']
})
export class AtencionTurnosComponent implements OnInit {

  listaTurnosPacientes:Turno[];
  page = 1;
  pageSize = 4;
  collectionSize:number;
  turnoParaDetalle:Turno;
  displayedColumns: string[] = ['nombre', 'fecha', 'hora','estado','especialidad','fechaAtencion','horaAtencion','observaciones'];
  dataSource:MatTableDataSource<Turno>;//= new MatTableDataSource(this.listaDeTurno);
  constructor(private usuarioServ:UsuarioService,private turnoServ:TurnoService,private modal:NgbModal) { 
    this.listaTurnosPacientes = new Array<Turno>();
    this.collectionSize = this.listaTurnosPacientes.length; 
    var mailProfesional = localStorage.getItem("usuarioLogueadoMail");

    this.turnoServ.ObtenerTurnos().subscribe((resp)=>{  
      this.listaTurnosPacientes = new Array<Turno>();
    for (const key in <Array<Turno>>resp) {
        const turno = <Turno>resp[key];
        // console.log("turno.especialista-",JSON.stringify(turno.especialista));
        // console.log("mailProfesional-",JSON.stringify(mailProfesional));

        if(JSON.stringify(turno.especialista)== JSON.stringify(mailProfesional)){
          this.usuarioServ.obtenerPorEntidadYParametros("mail",turno.paciente,"usuarios").subscribe((resUsuario)=>{
            // console.log(turno.paciente);
            // console.log(resUsuario);
            if(resUsuario!=null){
              turno.paciente = (<Usuario>resUsuario[0]).nombre +" " + (<Usuario>resUsuario[0]).apellido;
              turno.idPaciente = (<Usuario>resUsuario[0]).id;
            }
            
          })
          this.listaTurnosPacientes.push(turno);
        }            
    }
      this.dataSource= new MatTableDataSource(this.listaTurnosPacientes);
    });
  }
  ngOnInit(): void {
  }
 public tomarTurnoParaDetalle(turno:Turno){
   this.turnoParaDetalle= turno;
}
public MostrarDetalle(){
  
}

public rowSelected($event,row:Turno){
  var modalInstance = this.modal.open(ModalDetalleTurnoComponent,{windowClass: 'modal-holder', centered: true});
  modalInstance.componentInstance.turnoSeleccionado= row;
  // this.turnoParaDetalle = row;
}
}

import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Turno } from '../clases/turno';
import { HistorialMedico } from '../clases/historial-medico';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private dataServ:DataService) { }

  public AtenderTurno(turno:Turno,estado:string){
    return this.dataServ.UpdateTurno(turno,estado);
  }
  public ActualizarHistorialMed(historialMedico:HistorialMedico){
    return this.dataServ.UpdateHistorialMedico(historialMedico);
  }
  public AtenderTurnoProfesional(turno:Turno,estado:string){
    return this.dataServ.UpdateTurnoByRefDoc(turno.idTurno,estado,turno.observaciones);
  }
  ObtenerTurnos(){
    return this.dataServ.getAll("turnos");
  }
  obtenerPorEntidadYParametros<T>(param,value,entidad){
    return this.dataServ.getByProperty<T>(param,value,entidad);
  }  
  pedirTurno(turno:Turno){
    return this.dataServ.PostTurno(turno);
  }
  public ActualizarIdTurno(idTurno:string){
    return this.dataServ.UpdateIdTurno(idTurno);
  }
}

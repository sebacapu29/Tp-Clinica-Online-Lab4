import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private dataServ:DataService) { }

  ObtenerTurnos(){
    return this.dataServ.getAll("turnos");
  }
  obtenerPorEntidadYParametros<T>(param,value,entidad){
    return this.dataServ.getByProperty<T>(param,value,entidad);
  }  
}

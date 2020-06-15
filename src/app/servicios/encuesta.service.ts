import { Injectable } from '@angular/core';
import { EncuestaProfesional } from '../clases/encuesta-profesional';
import { DataService } from './data.service';
import { EncuestaSistema } from '../clases/encuesta-sistema';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private dataService:DataService) { }

  public CalificarProfesional(encuestaProfesional:EncuestaProfesional){
    return this.dataService.InsertEncuestaProfesional(encuestaProfesional);
  }
  public CalificarSistema(encuestaSistema:EncuestaSistema){
    // return this.dataService.InsertEncuestaProfesional(encuestaProfesional);
  }
  public TraerEncuestas(entidad:string){
    return this.dataService.getAll(entidad);
  }
  public TraerEncuestaParametros(param,value,entity){
    return this.dataService.getByProperty(param,value,entity);
  }
}

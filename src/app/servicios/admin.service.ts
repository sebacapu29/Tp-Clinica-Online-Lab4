import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private dataService:DataService) {

   }

   ObtenerInfoLogin(){
      return this.dataService.getAll("registro_login");     
   }
}

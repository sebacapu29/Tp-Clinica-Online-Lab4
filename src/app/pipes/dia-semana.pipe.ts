import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diasSemana'
})
export class DiaSemanaPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch(value){
      case '1':
        return "Lunes";
      
      case '2':
        return "Martes";
      
      case '3':
        return "Miercoles";
      
      case '4':
        return "Jueves";
      
      case '5':
        return "Viernes";
      
      case '6':
        return "Sabado";
      
      case '7':   
      return "Domingo";  
         
      default:
        return null;
         
    }
  }

}

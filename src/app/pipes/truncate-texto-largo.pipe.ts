import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateTextoLargo'
})
export class TruncateTextoLargoPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    
    if(value!=null && value.length<10 && value.length>0){
      return value;
    }
    if(value!=null&& value.length>25){
      return value.slice(0,value.length-value.length/2);
    }
    else if(value.length){
      return "-";
    }
  }

}

import { Component } from '@angular/core';
import { PdfHelper } from './clases/utils/pdf-helper';
import { ExcelHelper } from './clases/utils/excel-helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clinica-online';

  constructor(){
  }
 
}

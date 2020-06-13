import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Login } from 'src/app/clases/login';
import { AdminService } from 'src/app/servicios/admin.service';
import { PdfHelper } from 'src/app/clases/utils/pdf-helper';
import * as json2csv  from 'json2csv';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'fecha', 'hora'];
  dataSource:MatTableDataSource<Login>;
  listaInfoLog:Array<Login>;

  pdfHelper:PdfHelper;
  constructor(private adminService:AdminService) {
    this.listaInfoLog = new Array<Login>();

    this.adminService.ObtenerInfoLogin().subscribe((resp=>{
      // console.log(resp);
      if(resp!=null){
        this.listaInfoLog=resp;
        this.dataSource = new MatTableDataSource(resp);
      }
      this.pdfHelper = new PdfHelper();
    }));
   }

  ngOnInit(): void {
  }
  ExportarPDF(){
    var index=0;
    this.pdfHelper.EscribirPDF("reporte-login",'reporte');
 
  }
  ExportarExcel(){
    var lista:string[]=[];
    const csv:string[]=[];

    lista.push("Usuario");
    lista.push("Fecha");
    lista.push("Hora");
    csv.push(lista.join(","));
    lista = new Array<string>();

    for (let index = 0; index < this.listaInfoLog.length; index++) {
      const login = this.listaInfoLog[index];
      lista.push(login.usuario);
      lista.push(login.fecha);
      lista.push(login.hora);
      csv.push(lista.join(","));
      lista = new Array<string>();
    }
    var csvFinal = csv.join("\n");
    // var csv2 = csv.join('\n');

    // console.log(csv2);

      let blob = new Blob([csvFinal], { type: 'text/csv' });
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = 'reporte-login.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  }
}

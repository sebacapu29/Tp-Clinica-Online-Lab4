import { Component, OnInit } from '@angular/core';
import { Encuestas } from 'src/app/clases/encuestas';
import { EncuestaProfesional } from 'src/app/clases/encuesta-profesional';
import { EncuestaSistema } from 'src/app/clases/encuesta-sistema';
import { Profesional } from 'src/app/clases/Profesional';
import {Chart} from "chart.js";
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { Turno } from 'src/app/clases/turno';
import { TurnoService } from 'src/app/servicios/turno.service';
import { subscribeOn } from 'rxjs/operators';
import { Usuario } from 'src/app/clases/usuario';
import { PdfHelper } from 'src/app/clases/utils/pdf-helper';
@Component({
  selector: 'app-graficos-semanal',
  templateUrl: './graficos-semanal.component.html',
  styleUrls: ['./graficos-semanal.component.css']
})
export class GraficosSemanalComponent implements OnInit {

  listEncuetasMock:Array<Encuestas>;
  listaEncuestaProfesional:Array<EncuestaProfesional>;
  listaEncuestaAlSistema:Array<EncuestaSistema>;
  listaProfesionales:Array<Profesional>;
  listaTurnos:Array<Turno>;
  listaCantidadTurnosProfesional:number[];
  listaNombresProfesional:string[];
  chart:Chart;
  chartPie:Chart;
  chartBar2:Chart;
  pdfHelper:PdfHelper;

  constructor(private usuarioService:UsuarioService,
    private encuestaService:EncuestaService,
    private turnoService:TurnoService) { 
      this.listaCantidadTurnosProfesional = new Array<number>();
      this.listaNombresProfesional = new Array<string>();
      this.pdfHelper = new PdfHelper();
    this.listaProfesionales = new Array<Profesional>();   
    //  this.listaEncuestaProfesional = new Array<EncuestaProfesional>();
    //  this.listaEncuestaAlSistema = new Array<EncuestaSistema>();
    this.listaTurnos = new Array<Turno>();
    
   
    this.turnoService.ObtenerTurnos().subscribe((respTurnos)=>{
      
      if(respTurnos!=null){
        // console.log(respTurnos);
        this.listaTurnos = <Array<Turno>>respTurnos;
        this.ConfigurarGraficoBarrasTurnos(respTurnos);

        var contadorProfesional=0;

        this.CargarBarProfesionales();
        
      } 
    })
    // this.CrearMockEncuesta();
    }
    CargarBarProfesionales(){
     
      // var nuevoArray= new Array<Profesional>();

      // var contadorProfesional=0;
      // // console.log(this.listaTurnos);
      //  for (const turno of this.listaTurnos ) {
      //    if(turno.hasOwnProperty("idProfesional")){
      //     this.encuestaService.TraerEncuestaParametros("id",turno.idProfesional,"usuarios").subscribe((res)=>{
      //       if(res!=null){
              
      //         var profesional = <Profesional>res[0];
      //         if(!this.listaProfesionales.includes(profesional)){
      //           // console.log(profesional);
      //           this.listaProfesionales.push(profesional);
                
      //         }             
      //         // this.ConfigurarGraficoBarrasTurnos(respTurnos);
      //       }
      //     });
      //    }
         
      //   }
      //   // console.log( this.listaProfesionales.toArray());
      //   for (let i = 0; i < this.listaProfesionales.length; i++) {
      //     const profesional = this.listaProfesionales[i];
      //     // console.log(profesional);
      //     if(!nuevoArray.includes(profesional)){
      //       // contadorProfesional=1;
      //       nuevoArray.push(profesional);
      //       this.listaCantidadTurnosProfesional.push(contadorProfesional);
      //     }
      //   }
      //   console.log(this.listaProfesionales);
      //   if(this.listaProfesionales.length==0){
      //     console.log(this.listaCantidadTurnosProfesional);
      //     // this.listaCantidadTurnosProfesional.push(1);
      //     // this.listaNombresProfesional.push(this.listaProfesionales"apellido"])
      //   }
      //   else{
      //     for (const profesionalI of nuevoArray) {
      //       for (const profesionalJ of nuevoArray) {
      //         if(profesionalI.id ===profesionalJ.id){
      //           contadorProfesional++;
      //         }  
      //       }
      //       this.listaNombresProfesional.push(profesionalI.apellido);            
      //       this.listaCantidadTurnosProfesional.push(contadorProfesional);
      //       contadorProfesional=0;
      //     }
      //   }
      //   this.CrearGraficoBarrasProfesionalTurnos();
    }
  ngOnInit(): void {
    
  }
  onProfesionalSeleccionado(profesional){
    var profesionalParaGrafico = <Profesional>profesional.value;
 
  }
 
  ConfigurarGraficoBarrasTurnos(listaTurnos:Turno[]){
    const listPuntajes = [];
    const listaFechas=[];


      //Limpia el canvas para el proximo grafico a renderizar
      var canvasElement = document.getElementById("barCanvasSemanal");
      canvasElement.remove();
      var nuevoCanvas = document.createElement("canvas");
      nuevoCanvas.setAttribute("id","barCanvasSemanal");
      nuevoCanvas.className ="col-md-8";
      nuevoCanvas.style.width ="500vw";
      nuevoCanvas.style.height="50vh";
      var canvasContainer = document.getElementById("containerCanvas1");
      canvasContainer.appendChild(nuevoCanvas);
      /////

    //
    var canvas = <HTMLCanvasElement> document.getElementById("barCanvasSemanal");
    var context= canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    ///

    var listaDias=[];
    var cantidadTurnosEnDia=[];
    var contadorTurnos=0;

    var listaDiasFiltrada= new Array<Date>();
    console.log(this.listaTurnos);
    if(listaTurnos.length>0){

      for (const turno of listaTurnos) {
        // console.log(t);
        listaDias.push(turno.fecha);
      }
      // console.log(listaDias);

      for (const diaI of listaDias) {
        for (const diaJ of listaDias) {
          if(diaI===diaJ){
            contadorTurnos++;
          }  
        }
        cantidadTurnosEnDia.push(contadorTurnos);
        contadorTurnos=0;
      }
      
      // console.log(cantidadTurnosEnDia);
      // console.log(listaDias);
      // list.push(jsDate.toLocaleTimeString('es',options));
      this.chart = new Chart('barCanvasSemanal',{
        type:'bar',
        data:{
          labels:listaDias,
          datasets:[{
            label:["Cant Turnos x Dia"],
            
            data:cantidadTurnosEnDia,
            backgroundColor:[ 
              'rgb(0, 0, 255)',
              'rgb(255, 102, 0)',
              'rgb(102, 255, 153)',
              'rgb(255, 102, 204)',
              'rgb(51, 204, 204)',
              'rgb(51, 102, 0)',
              'rgb(0, 0, 255)',
              'rgb(255, 102, 0)',
              'rgb(102, 255, 153)',
              'rgb(255, 102, 204)',
              'rgb(51, 204, 204)',
              'rgb(51, 102, 0)',

            ],
            fill:false
            },               
          ]
        },
        options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          responsive:false
      }
      });
  }
}
CrearGraficoBarrasProfesionalTurnos(){

      //Limpia el canvas para el proximo grafico a renderizar
      var canvas = <HTMLCanvasElement> document.getElementById("barCanvasMedTurnos");
      var context= canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      ///
      // console.log(this.listaNombresProfesional);
  this.chart = new Chart('barCanvasMedTurnos',{
    type:'bar',
    data:{
      labels:this.listaNombresProfesional,
      datasets:[{
        label:["Cant Turnos x Profesional"],
        
        data:this.listaCantidadTurnosProfesional,
        backgroundColor:[ 
          'rgb(255, 102, 204)',
          'rgb(0, 0, 255)',
          'rgb(255, 102, 0)',
          'rgb(102, 255, 153)',
          'rgb(51, 204, 204)',
          'rgb(102, 255, 153)',
          'rgb(255, 102, 204)',
          'rgb(51, 204, 204)',
          'rgb(51, 102, 0)',
          'rgb(0, 0, 255)',
          'rgb(255, 102, 0)',                
          'rgb(51, 102, 0)',

        ],
        fill:false
        },               
      ]
    },
    options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      },
      responsive:false
  }
  });
}
onExportPDF(){
  this.pdfHelper.EscribirPDF("Grafico-Semanal","barCanvasSemanal");
}
  // ConfigurarGraficoTorta(){

  //   const listPuntajes = [];
  //   const listaFechas=[];

  //   this.listEncuetasMock.forEach((encuesta)=>{
  //     listaFechas.push(encuesta.fecha);
  //     listPuntajes.push(encuesta.puntaje);
  //   });

    
  //     // list.push(jsDate.toLocaleTimeString('es',options));
  //     this.chartPie = new Chart('pieCanvasSemanal',{
  //       type:'pie',
  //       data:{
  //         labels:listaFechas,
  //         datasets:[{
  //           label:"Encuesta 2020",
  //           data:listPuntajes,
  //           backgroundColor:[
  //             'rgb(0, 0, 255)',
  //             'rgb(255, 102, 0)',
  //             'rgb(51, 204, 51)',
  //           ],
  //           fill:false
  //           },               
  //         ]
  //       },
  //       options: {        
  //         responsive:false
  //     }
  //     });
  // }
}

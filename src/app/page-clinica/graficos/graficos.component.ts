import { Component, OnInit } from '@angular/core';
import {Chart} from "chart.js";
import { Encuestas } from 'src/app/clases/encuestas';
import { EncuestaProfesional } from 'src/app/clases/encuesta-profesional';
import { EncuestaSistema } from 'src/app/clases/encuesta-sistema';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { Profesional } from 'src/app/clases/Profesional';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  listEncuetasMock:Array<Encuestas>;
  listaEncuestaProfesional:Array<EncuestaProfesional>;
  listaEncuestaAlSistema:Array<EncuestaSistema>;
  listaProfesionales:Array<Profesional>;

  chart:Chart;
  chartPie:Chart;

  constructor(private usuarioService:UsuarioService,private encuestaService:EncuestaService) { 
    this.listaProfesionales = new Array<Profesional>();   
     this.listaEncuestaProfesional = new Array<EncuestaProfesional>();
     this.listaEncuestaAlSistema = new Array<EncuestaSistema>();

    this.usuarioService.obtenerUsuarios().subscribe((response)=>{
      if(response!=null){
        for (const usuario of response) {
          if(usuario.roll==1){
            this.listaProfesionales.push(usuario);
          }
        }
      }
    })
    this.CrearMockEncuesta();
    
  }
  CrearMockEncuesta(){
    this.listEncuetasMock = new Array<Encuestas>();
    var encuesta1 = new Encuestas();
    var encuesta2 = new Encuestas();
    var encuesta3 = new Encuestas();
    var encuesta4 = new Encuestas();
    encuesta1.puntaje=5;
    encuesta2.puntaje=2;
    encuesta3.puntaje=4;

    encuesta1.fecha = "1/06/2020";
    encuesta2.fecha = "8/06/2020";
    encuesta3.fecha = "16/06/2020";

    this.listEncuetasMock.push(encuesta1);
    this.listEncuetasMock.push(encuesta2);
    this.listEncuetasMock.push(encuesta3);
  }
  ngOnInit(): void {
    this.ConfigurarGraficoBarras();   
    this.ConfigurarGraficoTorta();
  }
  onProfesionalSeleccionado(profesional){
    var profesionalParaGrafico = <Profesional>profesional.value;
    this.encuestaService.TraerEncuestaParametros("idProfesional",profesionalParaGrafico.id,"encuestas_profesional").subscribe((res)=>{
      if(res!=null){
        this.listaEncuestaProfesional = <Array<EncuestaProfesional>>res;
        this.ConfigurarGraficoBarras();
      }
    });
  }
  ConfigurarGraficoBarras(){
    const listPuntajes = [];
    const listaFechas=[];
    //Limpia el canvas para el proximo grafico a renderizar
    var canvas = <HTMLCanvasElement> document.getElementById("barCanvas");
    var context= canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    ///

    if(this.listaEncuestaProfesional.length==0){
      this.listEncuetasMock.forEach((encuesta)=>{
        listaFechas.push(encuesta.fecha);
        listPuntajes.push(encuesta.puntaje);
      });
    }
    else{
      this.listaEncuestaProfesional.forEach((encuesta)=>{
        listaFechas.push(encuesta.fecha);
        listPuntajes.push(encuesta.puntaje);
      });
    }

      // list.push(jsDate.toLocaleTimeString('es',options));
      this.chart = new Chart('barCanvas',{
        type:'bar',
        data:{
          labels:listaFechas,
          datasets:[{
            label:"Encuesta 2020",
            data:listPuntajes,
            backgroundColor:[
              'rgb(0, 0, 255)',
              'rgb(0, 0, 255)',
              'rgb(0, 0, 255)',
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
  ConfigurarGraficoTorta(){

    const listPuntajes = [];
    const listaFechas=[];

    this.listEncuetasMock.forEach((encuesta)=>{
      listaFechas.push(encuesta.fecha);
      listPuntajes.push(encuesta.puntaje);
    });

    
      // list.push(jsDate.toLocaleTimeString('es',options));
      this.chartPie = new Chart('pieCanvas',{
        type:'pie',
        data:{
          labels:listaFechas,
          datasets:[{
            label:"Encuesta 2020",
            data:listPuntajes,
            backgroundColor:[
              'rgb(0, 0, 255)',
              'rgb(255, 102, 0)',
              'rgb(51, 204, 51)',
            ],
            fill:false
            },               
          ]
        },
        options: {        
          responsive:false
      }
      });
  }

}

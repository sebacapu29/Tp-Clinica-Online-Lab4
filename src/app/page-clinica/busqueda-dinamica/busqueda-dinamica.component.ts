import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/clases/usuario';
import { TurnoService } from 'src/app/servicios/turno.service';
import { HistorialMedico } from 'src/app/clases/historial-medico';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-busqueda-dinamica',
  templateUrl: './busqueda-dinamica.component.html',
  styleUrls: ['./busqueda-dinamica.component.css']
})
export class BusquedaDinamicaComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido','fecha'];
  dataSource:MatTableDataSource<any>;
  listaHistorialMedico:Array<HistorialMedico>;
  valorCombo:string;
  valorDinamico:string;
  propidadDinamica:string;
  listaNuevaEstructura:Array<any>;
  propiedadCombo:string;

  constructor(private turnoService:TurnoService, private usuarioService:UsuarioService) { 
    this.listaHistorialMedico = new Array<HistorialMedico>();
    this.listaNuevaEstructura = new Array<any>();

    this.turnoService.ObtenerHistoriaClinica().subscribe((response)=>{
      if(response!=null){
        this.listaHistorialMedico = <Array<HistorialMedico>>response;
      }
    })
  }

  ngOnInit(): void {
  }
  onBuscarPacientePor(prop){
    this.propiedadCombo = prop.value;
  }
  //Busca en el array de historia clinica
  onBuscarPaciente(){
    this.dataSource = new MatTableDataSource();
    this.listaNuevaEstructura = [];
    for (const historial of this.listaHistorialMedico) {
      if(historial["dto"][this.propidadDinamica] == this.valorDinamico){
        // console.log(historial);
        this.usuarioService.obtenerPorEntidadYParametros("id",historial.idPaciente,"usuarios").subscribe((resp)=>{
          if(resp!=null){
            this.CargarDataSource(<Usuario>resp[0],historial);
          }
        });        
      }
    }
  }
  onBusquedaPredeterminada(){
    // if(this.propiedadCombo == "nombrePaciente"){
    //   console.log(this.propiedadCombo)
    //   this.onBuscarPacientePorDefecto("nombre",this.valorCombo);
    // }
    // else if(this.propiedadCombo == "nombreMedico"){
    //   this.onBuscarPacientePorDefecto("nombre",this.valorCombo);
    // }
    // else if(this.propiedadCombo == "temperatura"){
    //   this.onBuscarPacientePorDefecto("temperatura",this.valorCombo);
    // }
    // else if(this.propiedadCombo == "especialidad"){
    //   this.onBuscarPacientePorDefecto("especialidad",this.valorCombo);
    // }
  }
  onBuscarPacientePorDefecto(propiedad:string,valor:string){
    this.dataSource = new MatTableDataSource();
    this.listaNuevaEstructura = [];
    for (const historial of this.listaHistorialMedico) {
      if(historial[propiedad] == valor){
        // console.log(historial);
        this.usuarioService.obtenerPorEntidadYParametros("id",historial.idPaciente,"usuarios").subscribe((resp)=>{
          if(resp!=null){
            this.CargarDataSource(<Usuario>resp[0],historial);
          }
        });        
      }
    }
  }
  CargarDataSource(usuario:Usuario,historialMedico:HistorialMedico){
    
    var nuevaEstructura ={
      nombre:usuario.nombre,
      apellido:usuario.apellido,
      fecha:historialMedico.fecha
    };

    var propiedades =  Object.getOwnPropertyNames(historialMedico["dto"]);
    // console.log(propiedades);
    // console.log(usuario);
    for (const propiedad of propiedades) {
      if(!this.displayedColumns.includes(propiedad)){
        this.displayedColumns.push(propiedad); 
      }
      nuevaEstructura[propiedad] = historialMedico["dto"][propiedad];
    }
    this.listaNuevaEstructura.push(nuevaEstructura);
    this.dataSource = new MatTableDataSource(this.listaNuevaEstructura);
    // console.log(this.displayedColumns)
    // console.log("nueva struct ",nuevaEstructura);
  }
}

import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Especialidad } from 'src/app/clases/especialidad';
import { Centro } from 'src/app/clases/centro';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  turno:Turno;
  profesional:Usuario;
  listaProfesionales:Usuario[];
  usuarioLogueado:Usuario;
  profesionalSeleccionado:any;
  centros:Centro;
  especialidades:Especialidad;

  constructor(private usuarioServ:UsuarioService) { 
    this.turno=new Turno();
    this.usuarioServ.obtenerPorEntidadYParametros<Usuario>("roll","1","usuarios").subscribe((response)=>{
      this.listaProfesionales = response;
    });
    this.usuarioServ.obtenerPorEntidadYParametros<Centro>("idProfesional","profesional@gmail.com","centros").subscribe((response)=>{
      this.centros = response[0];   
      console.log(response); 

    });
    this.usuarioServ.obtenerPorEntidadYParametros<Especialidad>("idProfesional","profesional@gmail.com","especialidades").subscribe((response)=>{
      this.especialidades = response[0];
    });
  }
  tomarProfesional(profesional:Usuario){
    console.log(profesional);

    
  this.profesionalSeleccionado=profesional;
  console.log(this.profesionalSeleccionado);
}
  ngOnInit(): void {
  }
  onSubmit(){

  }
//   traerTodos(listaUsuarios:Usuario[]){
//     this.usuarioServ.obtenerUsuarios().subscribe(res => 
//      {
//        this.listUsuarios = res;
//        var mailUsuarioLogueado= JSON.stringify(localStorage.getItem("usuarioLogueadoMail"));
//        this.ObtenerUsuarioLoguado(mailUsuarioLogueado);
//      }
//      ); 
//  }
}

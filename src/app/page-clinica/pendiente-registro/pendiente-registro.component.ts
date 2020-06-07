import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PendienteModalComponent } from '../pendiente-modal/pendiente-modal.component';

@Component({
  selector: 'app-pendiente-registro',
  templateUrl: './pendiente-registro.component.html',
  styleUrls: ['./pendiente-registro.component.css']
})
export class PendienteRegistroComponent implements OnInit {

  listaProfesionales:Usuario[];

  constructor(private usuarioServ:UsuarioService,private modalService: NgbModal) { 
    this.usuarioServ.obtenerPorEntidadYParametros<Usuario>("roll","1","usuarios").subscribe((response)=>{
      
      var listaFiltrada = response.filter((resp)=>{
        if(!resp.activo){
          return resp;
        }
      });

      this.listaProfesionales = listaFiltrada;
      // console.log(listaFiltrada);
    });
  }  

  ngOnInit(): void {
  }
  OnUsuarioSeleccionada(usuario:Usuario){
    const modalRef = this.modalService.open(PendienteModalComponent,{windowClass: 'modal-holder', centered: true});
    modalRef.componentInstance.profesionalSeleccionado = usuario;
}
}

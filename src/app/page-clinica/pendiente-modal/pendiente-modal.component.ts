import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-pendiente-modal',
  templateUrl: './pendiente-modal.component.html',
  styleUrls: ['./pendiente-modal.component.css']
})
export class PendienteModalComponent implements OnInit {

  @Input() profesionalSeleccionado:Usuario;
  constructor(private modal:NgbActiveModal,private usuarioServ:UsuarioService) { 

  }

  ngOnInit(): void {
  }
  Autorizar(){
    this.profesionalSeleccionado.activo=true;
    this.usuarioServ.AutorizarProfesional(this.profesionalSeleccionado);
  }
}

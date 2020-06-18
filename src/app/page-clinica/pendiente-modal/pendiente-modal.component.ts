import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pendiente-modal',
  templateUrl: './pendiente-modal.component.html',
  styleUrls: ['./pendiente-modal.component.css']
})
export class PendienteModalComponent implements OnInit {

  @Input() profesionalSeleccionado:Usuario;
  autorizando:boolean=false;

  constructor(private toastr:ToastrService, private modal:NgbActiveModal,private usuarioServ:UsuarioService) { 

  }

  ngOnInit(): void {
  }
  Autorizar(){
    this.autorizando=true;
    this.profesionalSeleccionado.activo=true;
    this.usuarioServ.AutorizarProfesional(this.profesionalSeleccionado).then(()=>{
    this.toastr.success("Usuario Actualizado!","Clinica");
    this.autorizando=false;
  }
).catch((err)=>{
  this.toastr.error(err);
  this.autorizando=false;
});
  }
}

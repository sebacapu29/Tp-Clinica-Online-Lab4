import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private usuarioServ:UsuarioService) {
    this.usuarioServ.obtenerUsuarios();
   }

  ngOnInit(): void {
  }

}

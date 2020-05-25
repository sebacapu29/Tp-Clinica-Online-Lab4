import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  mostrarBanner:boolean;

  constructor(private usuarioServ:UsuarioService) {

   }

  ngOnInit(): void {
    this.usuarioServ.IsLogIn().subscribe(res=>{ this.mostrarBanner=res!=null;});
  }

}

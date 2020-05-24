import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  mostrarBanner:boolean=false;

  constructor(private usuarioServ:UsuarioService) {
    if(this.usuarioServ.IsLogIn()){
      this.mostrarBanner=true;
    }
   }

  ngOnInit(): void {
  }

}

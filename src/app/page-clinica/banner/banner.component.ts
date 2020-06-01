import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  mostrarBanner:boolean;
  nombreUsuario:string;
  imgProfesional:string;
  imgHostpital:string[]=[];

  constructor(private usuarioServ:UsuarioService) {
    this.nombreUsuario = localStorage.getItem("usuarioLogueadoMail");
    this.imgProfesional = "assets/imagenes/profesional.jpg"
    this.imgHostpital = ["assets/imagenes/hospital1.jpg","assets/imagenes/hospital2.jpg","assets/imagenes/hospital3.jpg"];
   }

  ngOnInit(): void {
    this.usuarioServ.IsLogIn().subscribe(res=>{ this.mostrarBanner=res!=null;});
  }

}

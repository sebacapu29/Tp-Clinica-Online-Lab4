import { Component } from '@angular/core';
import {fader,slider} from './animations/route-animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    fader,
    //transformer,
    //stepper
  ]
})
export class AppComponent {
  title = 'clinica-online';

  constructor(){
  }
 prepareRoute(outlet:RouterOutlet){
   return outlet && outlet.activatedRouteData['animation'];
 }
}

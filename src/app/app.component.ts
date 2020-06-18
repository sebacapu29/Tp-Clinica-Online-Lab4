import { Component } from '@angular/core';
import {slideInAnimation} from './animations/route-animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    // fader,
    slideInAnimation
    //transformer,
    //stepper
  ]
})
export class AppComponent {
  title = 'clinica-online';

  constructor(){
  }
 prepareRoute(outlet:RouterOutlet){
   return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
 }
}

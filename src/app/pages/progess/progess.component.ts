import { Component } from '@angular/core';

@Component({
  selector: 'app-progess',
  templateUrl: './progess.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgessComponent {
    progreso1: number = 25;
    progreso2: number = 35;

    get getProceso1(){
      return `${this.progreso1}%`
    }

    get getProceso2(){
      return `${this.progreso2}%`
    }
}

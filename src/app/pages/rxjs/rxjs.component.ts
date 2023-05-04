import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent {

  constructor(){
    const obs$ = new Observable( observer => {

      setInterval(()=>{
        console.log('Tick');
        
      },1000);

    });

    obs$.subscribe(
      valor => {
        console.log('subs:', valor);
      },
      error => {
        console.log('Error');
      }
    );


  }

  

}

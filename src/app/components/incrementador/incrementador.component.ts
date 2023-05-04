import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent {
  @Input() progreso : number = 10;
  @Input() btnClass: string = 'btn btn-primary'

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  public cambiarProgreso(porcentaje:number){

    if (this.progreso >=100 && porcentaje >=0) {
      this.valorSalida.emit(100);
       this.progreso = 100;
       return;
    }

    if (this.progreso <=0 && porcentaje < 0) {
      this.valorSalida.emit(0);
      this.progreso = 0;
      return;
    }
    
    this.progreso = this.progreso + porcentaje;
    this.valorSalida.emit(this.progreso);
  }

  onChange(valor:number){
    if (valor>=100) {
      this.progreso =100;
    }else if(valor<=0){
      this.progreso=0
    }else{
      this.progreso=valor
    }
    this.valorSalida.emit(this.progreso);
  }
}

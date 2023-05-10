import { Component } from '@angular/core';

@Component({
  selector: 'app-model-imagen',
  templateUrl: './model-imagen.component.html',
  styleUrls: ['./model-imagen.component.css']
})
export class ModelImagenComponent {

  public ocultarModal: boolean = false;


  cerrarModal(){
    this.ocultarModal = true;
  }

}

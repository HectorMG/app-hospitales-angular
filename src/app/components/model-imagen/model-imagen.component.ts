import { Component } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-model-imagen',
  templateUrl: './model-imagen.component.html',
  styleUrls: ['./model-imagen.component.css']
})
export class ModelImagenComponent {
  public imagen: File;
  public imgTemp: any = '';

  constructor(public modalImagenService: ModalImagenService ){}

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(event){
    this.imagen = event.target.files[0]; 

    if (!this.imagen) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.imagen);

    reader.onloadend = () => {
      this.imgTemp = reader.result
    }

  }

}

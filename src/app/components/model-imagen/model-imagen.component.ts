import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-model-imagen',
  templateUrl: './model-imagen.component.html',
  styleUrls: ['./model-imagen.component.css']
})
export class ModelImagenComponent {
  public imagen: File;
  public imgTemp: any = '';

  constructor(public modalImagenService: ModalImagenService, private fileUpload: FileUploadService ){}

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

  subirImagen(){
    this.fileUpload.actualizarFoto(this.modalImagenService.tipo,this.imagen,this.modalImagenService.id).subscribe(
      (res:string) => {
        Swal.fire('Guardado','Imagen de usuario actualizada', 'success')
        this.cerrarModal();
        this.modalImagenService.nuevaImagen.emit(res);
      },
      error=>{
        Swal.fire('Error',error.error.msg, 'error')
      }
    );
  }

}

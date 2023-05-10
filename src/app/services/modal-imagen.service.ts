import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: string;
  public id: string;
  public img?: string;

  constructor() { }


  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(tipo: string, id: string, img?:string){
    this.tipo = tipo;
    this.id = id;
    this.img = img;

    if (!img){
      this.img = `${base_url}/upload/usuarios/no-image`
    }else if (img.includes('https')) {
      this.img = img;
    }else if (img) {
      this.img = `${base_url}/upload/${tipo}/${img}`
    }else{
      this.img = `${base_url}/upload/usuarios/no-image`
    }

    this._ocultarModal = false;
  }

  cerrarModal(){
    this._ocultarModal = true;
  }
}

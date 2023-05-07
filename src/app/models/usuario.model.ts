import { environment } from "src/environments/environment.development";

const base_url = environment.base_url;

export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password: string,
    public imag?: string,
    public role?: string,
    public google?: boolean,
    public uid?: string
  ) {}

  getImagen(){

    if (this.google) {
      return this.imag;
    }

    if (this.imag) {
      return `${base_url}/upload/usuarios/${this.imag}`
    }else{
      return `${base_url}/upload/usuarios/no-image`
    }
  }
}

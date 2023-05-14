import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class imagenPipe implements PipeTransform {

  transform(img:string, tipo: string): string {
    if (!img){
      return `${base_url}/upload/usuarios/no-imge`
    }else if (img.includes('https')) {
      return img;
    }else if (img) {
      return `${base_url}/upload/${tipo}/${img}`
    }else{
      return `${base_url}/upload/usuarios/no-imge`
    }
  }

}

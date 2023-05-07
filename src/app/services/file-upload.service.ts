import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  actualizarFoto(entidad:string,archivo:File,uid:string){

    const formData = new FormData();
    formData.append('imagen', archivo);

    return this.http.put(`${base_url}/upload/${entidad}/${uid}`, formData, {
      headers:{
        'x-token': localStorage.getItem('token')
      }
    }).pipe(
      map( (res:any)=>res.nombreArchivo )
    )

  }
}

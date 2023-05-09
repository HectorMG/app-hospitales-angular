import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }


  get getToken(): string{
    const token = localStorage.getItem('token') || '';
    return token;
  }

  buscarUsuario(tipo:string, busqueda: string){

    const url = `${base_url}/busqueda/coleccion/${tipo}/${busqueda}`;
    return this.http.get<any[]>(url,{
      headers:{
        'x-token': this.getToken
      }
    }).pipe(
      map( (resp: any) => resp.resultado)
    )
  }
}

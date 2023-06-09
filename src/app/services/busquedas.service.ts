import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/Hospital.model';
import { Medico } from '../models/Medico.model';

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

  busquedaGeneral(termino: string){
    return this.http.get(`${base_url}/busqueda/${termino}`, {
      headers:{
        'x-token': this.getToken
      }
    }).pipe(
      map(
        (resp: { usuarios:Usuario[], hospitales: Hospital[], medicos: Medico[] }) =>{
          return {
           'usuarios': resp.usuarios,
           'hospitales': resp.hospitales,
           'medicos': resp.medicos
          }
        }
      )
    )

  }

  buscarColeccion(tipo:string, busqueda: string){

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

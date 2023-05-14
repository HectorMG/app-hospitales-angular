import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Medico } from '../models/Medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private http: HttpClient) { }


  obtenerMedicos(){
    return this.http.get(`${base_url}/medicos`,{
      headers:{
        'x-token': localStorage.getItem('token')
      }
    }).pipe(
      map(
        (resp: {medicos}) => {
          return {
            medicos: resp.medicos
          }
        }
      )
    )
  }

  crearMedico(medico: Medico){
    return this.http.post(`${base_url}/medicos/`,medico,{
      headers:{
        'x-token': localStorage.getItem('token')
      }
    })
  }

  actualizarMedico(medico: Medico){

    const url = `${base_url}/medicos/${medico._id}`

    return this.http.put(url,medico,{
      headers:{
        'x-token': localStorage.getItem('token')
      }
    })
  }

  eliminarMedico(medico:Medico){

    const url = `${base_url}/medicos/${medico._id}`

    return this.http.delete(url,{
      headers:{
        'x-token': localStorage.getItem('token')
      }
    })
  }

  obtenerMedico(id: string){

    return this.http.get(`${base_url}/medicos/${id}`,{
      headers:{
        'x-token': localStorage.getItem('token')
      }
    }).pipe(
      map(
        (resp: {ok:boolean, medico: Medico}) => resp.medico
      )
    );

  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Hospital } from '../models/Hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  constructor(private http: HttpClient) { }

  obtenerHospitales(desde:number){
    return this.http.get(`${base_url}/hospitales?desde=${desde}`,{
      headers:{
        'x-token': localStorage.getItem('token')
      }
    }).pipe(
      map(
        (resp:{ok:boolean,hospitales: Hospital[], total: number}) => {
          return {
            hospitales: resp.hospitales,
            total: resp.total,
          }
        }
      )
    );
  }

  crearHospital(nombre:string){

    const url = `${base_url}/hospitales`

    return this.http.post(url,{nombre:nombre},{
      headers:{
        'x-token': localStorage.getItem('token')
      }
    })
  }

  actualizarHospital(hospital:Hospital){

    const url = `${base_url}/hospitales/${hospital._id}`

    return this.http.put(url,hospital,{
      headers:{
        'x-token': localStorage.getItem('token')
      }
    })
  }

  eliminarHospital(hospital:Hospital){

    const url = `${base_url}/hospitales/${hospital._id}`

    return this.http.delete(url,{
      headers:{
        'x-token': localStorage.getItem('token')
      }
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registerForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment.development';
import { loginForm } from '../interfaces/login-form.interface';
import { tap } from 'rxjs';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(private http: HttpClient) { }

  crearUsuario( data: registerForm ){
    return this.http.post(`${base_url}/usuarios`,data).pipe(tap( (resp:any) => {
      localStorage.setItem('token',resp.token)
    }));
  }

  login(data: loginForm){
    return this.http.post(`${base_url}/auth/login`,data).pipe(tap( (resp:any) => {
      localStorage.setItem('token',resp.token)
    }));
  }

  loginGoogle(token: string){
    return this.http.post(`${base_url}/auth/google`,{ token }).pipe(tap( (resp:any) =>{
      localStorage.setItem('token',resp.token)
    } ));
  }
}

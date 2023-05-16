import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registerForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment.development';
import { loginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const google: any;



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public usuario: Usuario;

  constructor(private http: HttpClient, private router: Router) { }

  guardarLocalStorage(token: string, menu:string){
    localStorage.setItem('token',token);
    localStorage.setItem('menu', JSON.stringify(menu))
  }

  getToken(): string{
    const token = localStorage.getItem('token') || '';
    return token;
  }

  crearUsuario( data: registerForm ){
    return this.http.post(`${base_url}/usuarios`,data).pipe(tap( (resp:any) => {
      this.guardarLocalStorage(resp.token, resp.menu);
    }));
  }

  login(data: loginForm){
    return this.http.post(`${base_url}/auth/login`,data).pipe(tap( (resp:any) => {
      this.guardarLocalStorage(resp.token, resp.menu);
    }));
  }

  loginGoogle(token: string){
    return this.http.post(`${base_url}/auth/google`,{ token }).pipe(tap( (resp:any) =>{
      this.guardarLocalStorage(resp.token, resp.menu);
    } ));
  }

  validarToken(): Observable<boolean>{

    return this.http.get(`${base_url}/auth/renew`,{
      headers: {
        'x-token': this.getToken()
      }
    }).pipe(
      map( (resp:any) =>{
        const {
          nombre,
          email,
          rol,
          google,
          imag,
          uid
        } = resp.usuario;
        this.usuario = new Usuario(nombre,email, '', imag, rol, google, uid)
        
        this.guardarLocalStorage(resp.token, resp.menu);
        return true
      } ),
      catchError( error => of(false) )
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    google.accounts.id.revoke('hector980715@gmail.com', () => {})

    this.router.navigateByUrl('/login');

  }

  actualizarUsuario(data:any){

    data = {
      ...data,
      rol: this.usuario.rol
    }

    return this.http.put(`${base_url}/usuarios/${this.usuario.uid}`,data, {
      headers:{
        'x-token': this.getToken()
      }
    });

  }

  obtenerUsuarios(desde: number = 0){

    const url = `${base_url}/usuarios?desde=${desde}`;

    return this.http.get<{total:number,usuarios:Usuario[]} >(url, {
      headers:{
        'x-token': this.getToken()
      }
    }).pipe(
      map( resp => {
        const usuarios = resp.usuarios.map( user => new Usuario(user.nombre, user.email, '', user.imag, user.rol, user.google, user.uid))

        return {
          total: resp.total,
          usuarios
        }
      })
    )
  }

  eliminarUsuario(uid:string){

    return this.http.delete(`${base_url}/usuarios/${uid}`,{
      headers:{
        'x-token': this.getToken()
      }
    });

  }

  editarUsuario(usuario: Usuario){

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`,usuario, {
      headers:{
        'x-token': this.getToken()
      }
    });
  }
}

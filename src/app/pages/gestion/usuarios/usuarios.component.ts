import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[];
  public usuariosTemp: Usuario[];

  public totalUsuarios: number = 0;
  public desde: number = 0;

  constructor(private usuarioService: UsuarioService, private busquedaService: BusquedasService){}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }


  obtenerUsuarios(){
    this.usuarioService.obtenerUsuarios(this.desde).subscribe(
      ({total, usuarios}) => {
        this.totalUsuarios = total;
        if (usuarios.length!==0) {
          this.usuarios = usuarios  
          this.usuariosTemp = usuarios 
        }
      }
    );
  }

  cambiarPagina(valor: number){
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    }else if(this.desde > this.totalUsuarios){
      this.desde -= valor;
    }

    this.obtenerUsuarios()
  }

  buscarUsuario(busqueda:string){
    if (busqueda.length===0) {
      return this.usuarios = this.usuariosTemp
    }

    this.busquedaService.buscarUsuario('usuarios',busqueda).subscribe(
      resp => {
        const usuarios = resp.map( user => new Usuario(user.nombre, user.email, '', user.imag, user.rol, user.google, user.uid))
        this.usuarios = usuarios
      }
    )
    return 0;
  }
  
}

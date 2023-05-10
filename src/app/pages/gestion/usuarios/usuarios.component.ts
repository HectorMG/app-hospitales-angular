import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

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

  constructor(private usuarioService: UsuarioService, private busquedaService: BusquedasService, private imagenModalService : ModalImagenService){}

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

  eliminarUsuario(uid:string){

    if (this.usuarioService.usuario.uid===uid) {
      Swal.fire(
        'Error!',
        'No puede eliminar su usuarios',
        'error'
        );
        return;
    }

    Swal.fire({
      title: 'Este usuario se eliminará?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(uid).subscribe(
          resp=>{
            console.log(resp);
            Swal.fire(
              'Eliminado!',
              'El usuario se ha eliminado',
              'success'
              )
            this.obtenerUsuarios();
          }
        );
      }
    })
  }

  cambiarRole(usuario:Usuario){
    this.usuarioService.editarUsuario(usuario).subscribe(
      ()=>{},
      error => {
        Swal.fire('Error', 'No se pudo actualizar el usuario','error');
      }
    )
  }

  abrirModal(usuario: Usuario){
    this.imagenModalService.abrirModal('usuarios',usuario.uid,usuario.imag);
  }

}

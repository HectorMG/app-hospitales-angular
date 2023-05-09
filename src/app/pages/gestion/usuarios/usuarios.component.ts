import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[];
  public totalUsuarios: number = 0;
  public desde: number = 0;

  constructor(private usuarioService: UsuarioService){}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }


  obtenerUsuarios(){
    this.usuarioService.obtenerUsuarios(this.desde).subscribe(
      ({total, usuarios}) => {
        console.log(usuarios);
        
        this.totalUsuarios = total;
        if (usuarios.length!==0) {
          this.usuarios = usuarios   
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
  
}

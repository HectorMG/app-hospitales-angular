import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  usuario: Usuario;
  public updateForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private usuarioService:UsuarioService){
    this.usuario = this.usuarioService.usuario;

    this.updateForm = this.formBuilder.group({
      nombre: [this.usuario.nombre,[Validators.required]],
      email: [this.usuario.email,[Validators.required,Validators.email]]
    });
  }

  updateUser(){
    this.usuarioService.actualizarUsuario(this.updateForm.value).subscribe(
      () => {
        const {nombre, email} = this.updateForm.value
        this.usuario.email = email;
        this.usuario.nombre = nombre;
      }
    );
  }

}

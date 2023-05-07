import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  usuario: Usuario;
  public updateForm: FormGroup;
  public imagen: File;
  public imgTemp: any = '';
  
  constructor(private formBuilder: FormBuilder, private usuarioService:UsuarioService, private fileUpload: FileUploadService){
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

  cambiarImagen(event){
    this.imagen = event.target.files[0]; 

    if (!this.imagen) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(this.imagen);

    reader.onloadend = () => {
      this.imgTemp = reader.result
    }

  }

  subirImagen(){
    this.fileUpload.actualizarFoto('usuarios',this.imagen,this.usuario.uid).subscribe(
      (res:string) => {
        this.usuario.imag = res
      }
    );
  }

}

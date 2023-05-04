import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formularioEnviado = false;

  public registerForm = this.formBuilder.group({
    nombre: ['', [ Validators.required, Validators.minLength(3) ]],
    email: [ '', [Validators.required, Validators.email ]],
    password: ['',Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required]
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private formBuilder: FormBuilder, private usuarioService : UsuarioService){}

  crearUsuario(){
    this.formularioEnviado = true;


    if (this.registerForm.invalid) {
      return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(resp => {
      console.log(resp);
    },
    (error) => {
      //console.log(error.error.msg);
      Swal.fire('Error', error.error.msg,'error');
    })
  }

  campoValido(campo:string){
    if (this.registerForm.get(campo).invalid  && this.formularioEnviado) {
      return true;
    }else{
      return false;
    }
  }

  aceptarTerminos(){
    return !this.registerForm.get('terminos').value && this.formularioEnviado;
  }


  validacionContrasenas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ((pass1 !== pass2) && this.formularioEnviado ) {
      return true;
    }
    else{
      return false;
    }
  }

  passwordsIguales(campo1: string, campo2:string){
    return (formGroup: FormGroup) => {
      const campo1Control = formGroup.get(campo1);
      const campo2Control = formGroup.get(campo2)

      if (campo1Control.value  === campo2Control.value) {
        campo1Control.setErrors(null);
      }else{
        campo1Control.setErrors({noEsIgual:true});
      }

    }
  }

}

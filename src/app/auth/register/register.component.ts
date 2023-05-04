import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  });

  constructor(private formBuilder: FormBuilder){}

  crearUsuario(){
    this.formularioEnviado = true;
    console.log(this.registerForm.value);
    
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

}

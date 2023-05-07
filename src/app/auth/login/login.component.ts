import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'  ]
})
export class LoginComponent {


  public formularioEnviado = false;

  public loginForm = this.formBuilder.group({
    email: ['',[ Validators.required, Validators.email]],
    password: ['',Validators.required]
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private usuariosService: UsuarioService ){

  }

  campoValido(campo:string){
    if (this.loginForm.get(campo).invalid  && this.formularioEnviado) {
      return true;
    }else{
      return false;
    }
  }

  login(){
    console.log(this.loginForm.value);
    this.formularioEnviado = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.usuariosService.login(this.loginForm.getRawValue()).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/');
      },
      error=>{
        Swal.fire('Error', error.error.msg,'error');
      }
    );

  }
}

import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'  ]
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('googleBtn') googleBtn : ElementRef

  public formularioEnviado = false;

  public loginForm = this.formBuilder.group({
    email: [ localStorage.getItem('email') || '',[ Validators.required, Validators.email]],
    password: ['',Validators.required],
    remember: [false]
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private usuariosService: UsuarioService ){

  }


  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "102872700197-v7cjg5noqh5j0d7deg5ermfqbthgmlba.apps.googleusercontent.com",
      callback: response =>  this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }


  handleCredentialResponse(response:any){
    this.usuariosService.loginGoogle(response.credential).subscribe(
      resp => this.router.navigateByUrl('/'),
      error => console.log(error)
    );
  }

  campoValido(campo:string){
    if (this.loginForm.get(campo).invalid  && this.formularioEnviado) {
      return true;
    }else{
      return false;
    }
  }

  login(){
    this.formularioEnviado = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.usuariosService.login(this.loginForm.getRawValue()).subscribe(
      data => {
        console.log(data);

        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email',this.loginForm.get('email').value)
        }else{
          localStorage.removeItem('email')
        }
        this.router.navigateByUrl('/');
      },
      error=>{
        Swal.fire('Error', error.error.msg,'error');
      }
    );

  }
}

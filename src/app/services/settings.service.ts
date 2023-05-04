import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public elementTheme = document.querySelector('#theme');

  constructor() { 
    const theme = localStorage.getItem('theme') || "default-dark";
    const url = `./assets/css/colors/${theme}.css`
    this.elementTheme?.setAttribute('href', url);
  }

  changeTheme(theme:string){
    const url = `./assets/css/colors/${theme}.css`
    
    this.elementTheme?.setAttribute('href', url);
    localStorage.setItem('theme', theme);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    const links = document.querySelectorAll('.selector');
    const theme = localStorage.getItem('theme');

    links.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');

      if (btnTheme===theme) {
        element.classList.add('working');
      }
    })
  }

}

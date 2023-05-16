import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu : any[] = [];


  constructor() { 
  }

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu'));
  }
}

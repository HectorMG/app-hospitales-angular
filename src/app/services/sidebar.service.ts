import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu : any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      subMenu: [
        { titulo: 'Main', url: '/'},
        { titulo: 'ProgressBar', url: 'progress'},
        { titulo: 'Grafica', url: 'grafica1'},
        { titulo: 'Rxjs', url: 'rxjs'}

      ]
    },
    {
      titulo: 'Gestión',
      icono: 'mdi mdi-folder-lock-open',
      subMenu: [
        { titulo: 'Usuarios', url: 'usuarios'},
        { titulo: 'Hospitales', url: 'hospitales'},
        { titulo: 'Médicos', url: 'medicos'},

      ]
    },
  ]
  constructor() { }
}

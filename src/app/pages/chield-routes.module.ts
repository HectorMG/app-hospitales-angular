import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgessComponent } from './progess/progess.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './gestion/usuarios/usuarios.component';
import { HospitalesComponent } from './gestion/hospitales/hospitales.component';
import { MedicosComponent } from './gestion/medicos/medicos.component';
import { MedicoComponent } from './gestion/medicos/medico/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { RolGuard } from '../guards/rol.guard';
import {  RouterModule, Routes } from '@angular/router';

const childRoutes: Routes = [
        { path: '' , component: DashboardComponent, data: {titulo: 'Dashboard'}},
        { path: 'progress', component: ProgessComponent,  data: {titulo: 'Progress'}},
        { path: 'grafica1', component: Grafica1Component,  data: {titulo: 'Gráfica'} },
        { path: 'account-settings', component: AccountSettingsComponent,  data: {titulo: 'Tema'}},
        { path: 'rxjs', component: RxjsComponent,  data: {titulo: 'Rjxs'}},
        { path: 'perfil', component: ProfileComponent,  data: {titulo: 'Mi Perfil'}},
        
        { path: 'hospitales', component: HospitalesComponent,  data: {titulo: 'Hospitales'}},
        { path: 'medicos', component: MedicosComponent,  data: {titulo: 'Médicos'}},
        { path: 'medico/:id', component: MedicoComponent,  data: {titulo: 'Detalle Médico'}},
        { path: 'busqueda/:termino', component: BusquedaComponent,  data: {titulo: 'Resultado Búsqueda'}},
        
        { path: 'usuarios',  canActivate: [RolGuard], component: UsuariosComponent,  data: {titulo: 'Usuarios'}},
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChieldRoutesModule { }

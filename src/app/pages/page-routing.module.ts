import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgessComponent } from './progess/progess.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes = [
    { 
      path: 'dashboard', 
      component: PagesComponent,
      children: [
        { path: '' , component: DashboardComponent, data: {titulo: 'Dashboard'}},
        { path: 'progress', component: ProgessComponent,  data: {titulo: 'Progress'}},
        { path: 'grafica1', component: Grafica1Component,  data: {titulo: 'Gráfica'} },
        { path: 'account-settings', component: AccountSettingsComponent,  data: {titulo: 'Tema'}},
        { path: 'rxjs', component: RxjsComponent,  data: {titulo: 'Rjxs'}},
      ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgessComponent } from './progess/progess.component';


const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        children: [
          { path: '' , component: DashboardComponent},
          { path: 'progress', component: ProgessComponent},
          { path: 'grafica1', component: Grafica1Component},
        ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

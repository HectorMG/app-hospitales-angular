import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgessComponent } from './progess/progess.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    ProgessComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    RxjsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    
    SharedModule,
    ComponentsModule
  ],
  exports:[
    ProgessComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent
  ]
})
export class PagesModule { }

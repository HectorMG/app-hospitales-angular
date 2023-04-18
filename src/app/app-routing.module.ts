import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { PagesRoutingModule } from './pages/page-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**', component: NotpagefoundComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

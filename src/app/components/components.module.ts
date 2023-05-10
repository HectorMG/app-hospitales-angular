import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { NgChartsModule } from 'ng2-charts';
import { ModelImagenComponent } from './model-imagen/model-imagen.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModelImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports:[
    IncrementadorComponent,
    DonaComponent,
    ModelImagenComponent
  ]
})
export class ComponentsModule { }

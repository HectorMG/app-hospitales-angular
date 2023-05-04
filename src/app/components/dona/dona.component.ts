import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartDataset} from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent{
  @Input() labels: string[] = [ 'Label 1', 'Label 2', 'Label 3' ];

  @Input() data =  [{ data: [10, 10, 10] }];


  @Input() title : string = 'Gráfica 1';
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-notpagefound',
  templateUrl: './notpagefound.component.html',
  styleUrls: [ './notpagefound.component.css' ]
})
export class NotpagefoundComponent {
  public year = new Date().getFullYear();
}

import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFuntions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  constructor( private settingService: SettingsService) {}

  ngOnInit(): void {
    customInitFuntions();
  }

}

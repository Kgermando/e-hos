import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './menu-item';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

  menu = MENU_ITEMS;

  constructor() { }

  ngOnInit() {
  }

}

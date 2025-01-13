import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilterMatchMode } from 'primeng/api';
import { PrimeNG } from 'primeng/config';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  constructor(private primeng: PrimeNG) {}

  ngOnInit() {
    this.primeng.ripple.set(true);
    this.primeng.zIndex = {
    modal: 1100,    // dialog, sidebar
    overlay: 1000,  // dropdown, overlaypanel
    menu: 1000,     // overlay menus
    tooltip: 1100   // tooltip
  };
  this. primeng.filterMatchModeOptions = {
    text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
    numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
};
  }
  title = 'TasksMgmnt.FE';
}

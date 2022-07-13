import { Component, OnInit } from '@angular/core';
import { BridgesMatTabNavData } from 'src/app/modular-tabs/bridges-mat-tab-nav-panel/bridges-mat-tab-nav-panel.component';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css'],
})
export class DummyComponent implements OnInit {
  // tabs: BridgesMatTabNavData[] = [
  tabs = [
    {
      header: 'Route 1',
      route: 'route-1',
    },
    {
      header: 'Route 2',
      route: 'route-2',
    },
    {
      header: 'Route 3',
      route: 'route-3',
    },
    {
      header: 'Disabled Route 4',
      route: 'route-4',
      disabled: true,
    },
    {
      header: 'Route 5',
      route: 'route-5',
    },
    {
      header: 'Route 6',
      route: 'route-6',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

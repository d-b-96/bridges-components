import { Component, OnInit } from '@angular/core';
import { BridgesMatTabNavData } from 'src/app/modular-tabs/bridges-mat-tab-nav-panel/bridges-mat-tab-nav-panel.component';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css'],
})
export class DummyComponent implements OnInit {
  tabs: BridgesMatTabNavData[] = [
    {
      header: 'MatTabGroup Demo',
      route: 'route-1',
    },
    {
      header: 'MatTable Demo',
      route: 'route-2',
    },
    {
      header: 'Disabled Route 3',
      route: 'route-3',
      disabled: true
    },
    {
      header: 'Route 4',
      route: 'route-4',
    },
    {
      header: 'Route 5',
      route: 'route-5',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

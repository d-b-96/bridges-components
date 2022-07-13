import { Component } from '@angular/core';
import { BridgesMatColumnDefinitionElement } from '../bridges-mat-table/bridges-mat-table.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'bridges-mat-table-demo',
  templateUrl: './bridges-mat-table-demo.component.html',
  styleUrls: ['./bridges-mat-table-demo.component.css'],
})
export class BridgesMatTableDemoComponent {
  columnDefinition: BridgesMatColumnDefinitionElement[] = [
    { identifier: 'position', title: 'Position', sticky: true },
    { identifier: 'name', title: 'Name', sticky: true },
    { identifier: 'weight', title: 'Weight' },
    { identifier: 'symbol', title: 'Symbol' },
  ];

  data: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Mandarine', weight: 15.4578, symbol: 'F' },
    { position: 11, name: 'Neon', weight: 19.1797, symbol: 'Ne' },
    { position: 12, name: 'Aon', weight: 12.2236, symbol: 'A' },
    { position: 13, name: 'Beon', weight: 20.3255, symbol: 'B' },
    { position: 14, name: 'Ceon', weight: 15.1236, symbol: 'C' },
    { position: 15, name: 'Deon', weight: 19.8723, symbol: 'D' },
    { position: 16, name: 'Eeon', weight: 82.9898, symbol: 'E' },
    { position: 17, name: 'Feon', weight: 64.2856, symbol: 'F' },
    { position: 18, name: 'Geon', weight: 42.1797, symbol: 'G' },
    { position: 19, name: 'Heon', weight: 31.4894, symbol: 'H' },
    { position: 20, name: 'Ieon', weight: 21.4681, symbol: 'I' },
    { position: 21, name: 'Jeon', weight: 48.4548, symbol: 'J' },
    { position: 22, name: 'Keon', weight: 98.1797, symbol: 'K' },
    { position: 23, name: 'Leon', weight: 72.1531, symbol: 'L' },
  ];
}

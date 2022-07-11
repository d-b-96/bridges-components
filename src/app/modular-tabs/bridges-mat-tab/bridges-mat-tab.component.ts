import { Component, Input, ViewChild } from '@angular/core';
import { MatTab } from '@angular/material/tabs';

@Component({
  selector: 'bridges-mat-tab',
  templateUrl: './bridges-mat-tab.component.html',
  styleUrls: ['./bridges-mat-tab.component.css'],
})
export class BridgesMatTabComponent {
  @Input() label!: string;
  @Input() disabled!: boolean;

  @ViewChild(MatTab)
  public matTab!: MatTab;
}

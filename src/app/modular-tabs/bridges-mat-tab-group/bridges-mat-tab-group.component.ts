import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  QueryList,
  ViewChild,
} from '@angular/core';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { BridgesMatTabComponent } from '../bridges-mat-tab/bridges-mat-tab.component';

export type BridgesMatTabGroupData = {
  header: string;
  disabled?: boolean;
};

@Component({
  selector: 'bridges-mat-tab-group',
  templateUrl: './bridges-mat-tab-group.component.html',
  styleUrls: ['./bridges-mat-tab-group.component.css'],
})
export class BridgesMatTabGroupComponent implements AfterViewInit {
  @ViewChild(MatTabGroup)
  public tabGroup!: MatTabGroup;

  @ViewChild(MatTab)
  public menuTab!: MatTab;

  //https://stackoverflow.com/questions/48840703/angular-material-tabs-not-working-with-wrapper-component
  @ContentChildren(BridgesMatTabComponent)
  protected tabComponents!: QueryList<BridgesMatTabComponent>;

  tabs!: BridgesMatTabGroupData[];
  selectedTab: number = 0;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.renderTabs();
    this.tabs = this.tabComponents.map((tab) => ({
      header: tab.label,
      disabled: tab.disabled,
    }));

    // Prevents ExpressionChangedAfterItHasBeenCheckedError
    // https://angular.io/errors/NG0100
    this.cd.detectChanges();
  }

  changeTab(index: number) {
    this.selectedTab = index;
  }

  private renderTabs() {
    const matTabsFromQueryList = this.tabComponents.map((tab) => tab.matTab);
    const list = new QueryList<MatTab>();
    list.reset([matTabsFromQueryList]);
    this.tabGroup._allTabs = list;
    this.tabGroup.ngAfterContentInit();
  }
}

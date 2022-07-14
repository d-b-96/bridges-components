import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { CalculatedTabExampleComponent } from './modular-tabs/calculated-tab-example/calculated-tab-example.component';
import { CalculatedTabComponent } from './modular-tabs/calculated-tab/calculated-tab.component';
import { MatButtonModule } from '@angular/material/button';
import { BridgesMatTabGroupComponent } from './modular-tabs/bridges-mat-tab-group/bridges-mat-tab-group.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BridgesMatTabNavPanelComponent } from './modular-tabs/bridges-mat-tab-nav-panel/bridges-mat-tab-nav-panel.component';
import { AppRoutingModule } from './app-routing.module';
import { RoutingDummyOneComponent } from './dummies/routing-dummy-one/routing-dummy-one.component';
import { RoutingDummyTwoComponent } from './dummies/routing-dummy-two/routing-dummy-two.component';
import { RoutingDummyThreeComponent } from './dummies/routing-dummy-three/routing-dummy-three.component';
import { RoutingDummyFourComponent } from './dummies/routing-dummy-four/routing-dummy-four.component';
import { RoutingDummyFiveComponent } from './dummies/routing-dummy-five/routing-dummy-five.component';
import { DummyComponent } from './dummies/dummy/dummy.component';
import { BridgesMatTabComponent } from './modular-tabs/bridges-mat-tab/bridges-mat-tab.component';
import { BridgesMatTableComponent } from './table/bridges-mat-table/bridges-mat-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RoutingDummySixComponent } from './dummies/routing-dummy-six/routing-dummy-six.component';
import { MatSortModule } from '@angular/material/sort';
import { BridgesMatTableDemoComponent } from './table/bridges-mat-table-demo/bridges-mat-table-demo.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GithubService } from './table/bridges-mat-table-demo/github.service';

@NgModule({
  declarations: [
    AppComponent,
    CalculatedTabExampleComponent,
    CalculatedTabComponent,
    BridgesMatTabGroupComponent,
    BridgesMatTabNavPanelComponent,
    RoutingDummyOneComponent,
    RoutingDummyTwoComponent,
    RoutingDummyThreeComponent,
    RoutingDummyFourComponent,
    RoutingDummyFiveComponent,
    DummyComponent,
    BridgesMatTabComponent,
    BridgesMatTableComponent,
    RoutingDummySixComponent,
    BridgesMatTableDemoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [GithubService],
  bootstrap: [AppComponent],
})
export class AppModule {}

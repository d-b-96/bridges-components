import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DummyComponent } from './dummies/dummy/dummy.component';
import { RoutingDummyFiveComponent } from './dummies/routing-dummy-five/routing-dummy-five.component';
import { RoutingDummyFourComponent } from './dummies/routing-dummy-four/routing-dummy-four.component';
import { RoutingDummyOneComponent } from './dummies/routing-dummy-one/routing-dummy-one.component';
import { RoutingDummyThreeComponent } from './dummies/routing-dummy-three/routing-dummy-three.component';
import { RoutingDummyTwoComponent } from './dummies/routing-dummy-two/routing-dummy-two.component';
import { BridgesMatTabGroupComponent } from './modular-tabs/bridges-mat-tab-group/bridges-mat-tab-group.component';
import { BridgesMatTabNavPanelComponent } from './modular-tabs/bridges-mat-tab-nav-panel/bridges-mat-tab-nav-panel.component';
import { CalculatedTabExampleComponent } from './modular-tabs/calculated-tab-example/calculated-tab-example.component';
import { CalculatedTabComponent } from './modular-tabs/calculated-tab/calculated-tab.component';

const routes: Routes = [
  {
    path: 'dummy',
    component: DummyComponent,
  },
  {
    path: 'bridges-mat-tab-group',
    component: BridgesMatTabGroupComponent,
  },
  {
    path: 'bridges-mat-tab-nav-panel',
    component: BridgesMatTabNavPanelComponent,
  },
  {
    path: 'calculated-tab',
    component: CalculatedTabComponent,
  },
  {
    path: 'calculated-tab-example',
    component: CalculatedTabExampleComponent,
  },
  {
    path: 'route-1',
    component: RoutingDummyOneComponent,
  },
  {
    path: 'route-2',
    component: RoutingDummyTwoComponent,
  },
  {
    path: 'route-3',
    component: RoutingDummyThreeComponent,
  },
  {
    path: 'route-4',
    component: RoutingDummyFourComponent,
  },
  {
    path: 'route-5',
    component: RoutingDummyFiveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

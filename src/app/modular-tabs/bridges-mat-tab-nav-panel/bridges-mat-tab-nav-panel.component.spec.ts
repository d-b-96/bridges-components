import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgesMatTabNavPanelComponent } from './bridges-mat-tab-nav-panel.component';

describe('BridgesMatTabNavPanelComponent', () => {
  let component: BridgesMatTabNavPanelComponent;
  let fixture: ComponentFixture<BridgesMatTabNavPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BridgesMatTabNavPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BridgesMatTabNavPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

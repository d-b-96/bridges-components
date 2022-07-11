import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgesMatTabGroupComponent } from './bridges-mat-tab-group.component';

describe('BridgesMatTabGroupComponent', () => {
  let component: BridgesMatTabGroupComponent;
  let fixture: ComponentFixture<BridgesMatTabGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BridgesMatTabGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BridgesMatTabGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

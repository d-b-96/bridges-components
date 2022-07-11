import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgesMatTabComponent } from './bridges-mat-tab.component';

describe('BridgesMatTabComponent', () => {
  let component: BridgesMatTabComponent;
  let fixture: ComponentFixture<BridgesMatTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BridgesMatTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BridgesMatTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

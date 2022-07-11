import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgesMatTableComponent } from './bridges-mat-table.component';

describe('BridgesMatTableComponent', () => {
  let component: BridgesMatTableComponent;
  let fixture: ComponentFixture<BridgesMatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BridgesMatTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BridgesMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

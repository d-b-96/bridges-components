import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgesMatTableDemoComponent } from './bridges-mat-table-demo.component';

describe('BridgesMatTableDemoComponent', () => {
  let component: BridgesMatTableDemoComponent;
  let fixture: ComponentFixture<BridgesMatTableDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BridgesMatTableDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BridgesMatTableDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

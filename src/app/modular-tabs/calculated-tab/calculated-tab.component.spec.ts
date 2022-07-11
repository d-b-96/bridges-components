import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatedTabComponent } from './calculated-tab.component';

describe('CalculatedTabComponent', () => {
  let component: CalculatedTabComponent;
  let fixture: ComponentFixture<CalculatedTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatedTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatedTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatedTabExampleComponent } from './calculated-tab-example.component';

describe('CalculatedTabExampleComponent', () => {
  let component: CalculatedTabExampleComponent;
  let fixture: ComponentFixture<CalculatedTabExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatedTabExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatedTabExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

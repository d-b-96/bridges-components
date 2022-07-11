import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingDummyFourComponent } from './routing-dummy-four.component';

describe('RoutingDummyFourComponent', () => {
  let component: RoutingDummyFourComponent;
  let fixture: ComponentFixture<RoutingDummyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingDummyFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingDummyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

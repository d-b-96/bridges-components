import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingDummyFiveComponent } from './routing-dummy-five.component';

describe('RoutingDummyFiveComponent', () => {
  let component: RoutingDummyFiveComponent;
  let fixture: ComponentFixture<RoutingDummyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingDummyFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingDummyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

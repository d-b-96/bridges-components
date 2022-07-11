import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingDummyTwoComponent } from './routing-dummy-two.component';

describe('RoutingDummyTwoComponent', () => {
  let component: RoutingDummyTwoComponent;
  let fixture: ComponentFixture<RoutingDummyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingDummyTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingDummyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

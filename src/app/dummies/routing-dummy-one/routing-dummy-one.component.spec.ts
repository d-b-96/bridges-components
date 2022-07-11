import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingDummyOneComponent } from './routing-dummy-one.component';

describe('RoutingDummyOneComponent', () => {
  let component: RoutingDummyOneComponent;
  let fixture: ComponentFixture<RoutingDummyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingDummyOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingDummyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

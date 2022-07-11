import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingDummyThreeComponent } from './routing-dummy-three.component';

describe('RoutingDummyThreeComponent', () => {
  let component: RoutingDummyThreeComponent;
  let fixture: ComponentFixture<RoutingDummyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingDummyThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingDummyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

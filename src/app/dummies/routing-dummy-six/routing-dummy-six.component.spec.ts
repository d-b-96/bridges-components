import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingDummySixComponent } from './routing-dummy-six.component';

describe('RoutingDummySixComponent', () => {
  let component: RoutingDummySixComponent;
  let fixture: ComponentFixture<RoutingDummySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingDummySixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingDummySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

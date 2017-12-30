import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastStepOrderComponent } from './last-step-order.component';

describe('LastStepOrderComponent', () => {
  let component: LastStepOrderComponent;
  let fixture: ComponentFixture<LastStepOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastStepOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastStepOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

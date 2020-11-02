import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStepperComponent } from './payment-stepper.component';

describe('PaymentStepperComponent', () => {
  let component: PaymentStepperComponent;
  let fixture: ComponentFixture<PaymentStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-payment-stepper',
  templateUrl: './payment-stepper.component.html',
  styleUrls: ['./payment-stepper.component.sass'],
})
export class PaymentStepperComponent implements OnInit {
  @Input() subtotal: number;
  uid: string;
  isLinear = true;


  @ViewChild('stepper', { static: true }) private myStepper: MatStepper;

  constructor(private router: Router) {}

  ngDoCheck(): void {

  }

  ngOnInit(): void {}

}
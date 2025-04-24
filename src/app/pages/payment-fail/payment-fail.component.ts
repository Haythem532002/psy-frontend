import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-payment-fail',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './payment-fail.component.html',
  styleUrl: './payment-fail.component.css',
})
export class PaymentFailComponent {}

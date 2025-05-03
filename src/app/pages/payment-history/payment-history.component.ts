import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { PaymentHistory } from '../../models/PaymentHistory';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class PaymentHistoryComponent implements OnInit {
  payments: PaymentHistory[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadPaymentHistory();
  }

  loadPaymentHistory(): void {
    this.userService.getPaymentHistory().subscribe({
      next: (response: PaymentHistory[]) => {
        this.payments = response;
        console.log(this.payments);
      },
      error: (error) => {
        console.error('Error fetching payment history:', error);
      },
    });
  }
}

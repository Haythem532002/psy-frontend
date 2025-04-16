import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl = 'http://localhost:7090/api/payment';

  constructor(private http: HttpClient) {}

  createCheckoutSession() {
    return this.http.get<{ payment_url: string }>(
      `${this.baseUrl}/create-checkout`
    );
  }
}
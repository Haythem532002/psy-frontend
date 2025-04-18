import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentBook } from '../../models/AppointmentBook';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl = 'http://localhost:7090/api/payment';

  constructor(private http: HttpClient) {}

  createCheckoutSession(appointmentRequest: AppointmentBook) {
    return this.http.post<{ payment_url: string }>(
      `${this.baseUrl}/create-checkout`,
      appointmentRequest
    );
  }
}

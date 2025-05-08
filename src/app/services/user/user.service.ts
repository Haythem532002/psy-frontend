import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../../models/Appointment';
import { getCookie } from '../../utils/getCookie';
import { PaymentHistory } from '../../models/PaymentHistory';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  saveUserId(email: string) {
    this.http
      .get<number>(`http://localhost:7090/users/email?email=${email}`)
      .subscribe((id) => {
        document.cookie = `userId=${id}; path=/;`;
      });
  }

  getAvailableAppointments() {
    const id = getCookie('userId');
    console.log("id "+ id);
    return this.http.get<Appointment[]>(
      `http://localhost:7090/users/appointments/${id}`
    );
  }

  getPaymentHistory() {
    const id = getCookie('userId');
    return this.http.get<PaymentHistory[]>(
      `http://localhost:7090/users/payment-history/${id}`
    );
  }

  getUserById() {
    const id = getCookie('userId');
    return this.http.get(
      `http://localhost:7090/users/${id}`
    );
  }

  editProfile() {
    const id = getCookie('userId');
    return this.http.patch(
      `http://localhost:7090/users/edit-profile/${id}`,{}
    );
  }
}

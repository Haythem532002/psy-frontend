import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../../models/Appointment';
import { getCookie } from '../../utils/getCookie';

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
}

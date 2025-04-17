import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}

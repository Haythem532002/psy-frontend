import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationRequest } from './Registration';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from './Login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:7090/auth';
  constructor(private http: HttpClient) {}
  register(registrationRequest: RegistrationRequest): Observable<number> {
    return this.http.post<number>(
      this.apiUrl + '/register',
      registrationRequest
    );
  }

  login(loginRequest: LoginRequest) {
    this.http
      .post<LoginResponse>(this.apiUrl + '/login', loginRequest)
      .subscribe({
        next: (response) => {
          document.cookie = `jwt=${response.token}; path=/;`;
          console.log('Success');
        },
        error: (error) => {
          console.log('Error is occured', error);
        },
        complete: () => {},
      });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationRequest } from '../../models/Registration';
import { catchError, map, Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../models/Login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:7090/auth';
  constructor(private http: HttpClient) {}

  isAuthenticated(accessToken: string): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/validate', accessToken).pipe(
      map((response) => response),
      catchError(() => [false])
    );
  }
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
          document.cookie = `accesstoken=${response.accessToken}; path=/;`;
          document.cookie = `refreshtoken=${response.refreshToken}; path=/;`;
          console.log('Success');
        },
        error: (error) => {
          console.log('Error is occured', error);
        },
        complete: () => {},
      });
  }
  refresh(refreshToken: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      this.apiUrl + '/refresh',
      refreshToken
    );
  }
}

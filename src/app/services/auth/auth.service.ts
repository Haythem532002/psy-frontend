import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationRequest } from '../../models/Registration';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../models/Login';
import { Router } from '@angular/router';
import { ValidateRequest } from '../../models/Validate';
import { RefreshRequest } from '../../models/Refresh';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:7090/auth';
  constructor(private http: HttpClient, private router: Router) {}

  register(registrationRequest: RegistrationRequest) {
    return this.http
      .post<number>(this.apiUrl + '/register', registrationRequest)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
          // console.log('Success', response);
        },
        error: (error) => {
          console.log('Error: ', error);
        },
      });
  }

  login(loginRequest: LoginRequest) {
    this.http
      .post<LoginResponse>(this.apiUrl + '/login', loginRequest)
      .subscribe({
        next: (response) => {
          document.cookie = `accesstoken=${response.accessToken}; path=/;`;
          document.cookie = `refreshtoken=${response.refreshToken}; path=/;`;
          // console.log('Success', response);
          this.router.navigate(['/doctorHome']);
        },
        error: (error) => {
          console.log('Error is occured', error);
        },
        complete: () => {},
      });
  }
  isAuthenticated(validateRequest: ValidateRequest): Observable<boolean> {
    return this.http
      .post<boolean>(this.apiUrl + '/validate', validateRequest)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }
  refresh(refreshRequest: RefreshRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.apiUrl + '/refresh', refreshRequest)
      .pipe(
        map((response: LoginResponse) => {
          document.cookie = `accesstoken=${response.accessToken}; path=/;`;
          document.cookie = `refreshtoken=${response.refreshToken}; path=/;`;
          return response;
        })
      );
  }
}

// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { AuthService } from './authService.service';
// import { getCookie } from '../../utils/getCookie';
// import { LoginResponse } from '../../models/Login';
// import { Router } from '@angular/router';

// @Injectable()
// export class LoginInterceptor implements HttpInterceptor {
//   constructor(private router: Router, private authService: AuthService) {}
//   intercept(
//     req: HttpRequest<any>,
//     handler: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     let accessToken = getCookie('acessToken');
//     let refreshToken = getCookie('refreshToken');
//     if (accessToken) {
//       let isTokenValid: boolean = false;
//       this.authService.isAuthenticated(accessToken).subscribe({
//         next: (response) => {
//           isTokenValid = response;
//         },
//         error: (error) => console.log('Access Token Not valid', error),
//       });
//       if (!isTokenValid) {
//         let refreshTokenResponse: LoginResponse = {
//           accessToken: '',
//           refreshToken: '',
//         };
//         if (refreshToken) {
//           let refreshTokenInvalid: boolean = false;
//           this.authService.refresh(refreshToken).subscribe({
//             next: (response) => {
//               refreshTokenResponse = {
//                 accessToken: response.accessToken,
//                 refreshToken: response.refreshToken,
//               };
//             },
//             error: (error) => (refreshTokenInvalid = true),
//           });
//           if (refreshTokenInvalid) {
//             this.router.navigate(['/login']);
//           }
//         }
//         if (refreshTokenResponse.refreshToken !== '') {
//           accessToken = refreshTokenResponse.accessToken;
//           document.cookie = `accesstoken=${accessToken}; path=/;`;
//         }
//       }
//       req = req.clone({
//         headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
//       });
//     }
//     return handler.handle(req);
//   }
// }

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, switchMap, catchError } from 'rxjs';
import { AuthService } from './authService.service';
import { Router } from '@angular/router';
import { getCookie } from '../../utils/getCookie';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let accessToken = getCookie('accessToken');
    let refreshToken = getCookie('refreshToken');

    if (!accessToken) {
      return next.handle(req); // No token, proceed without modifying request
    }

    return from(this.authService.isAuthenticated(accessToken)).pipe(
      switchMap((isValid) => {
        if (isValid) {
          return next.handle(this.addAuthHeader(req, accessToken));
        }

        // Access token is invalid, try refreshing
        if (!refreshToken) {
          this.router.navigate(['/login']);
          return next.handle(req);
        }

        return from(this.authService.refresh(refreshToken)).pipe(
          switchMap((response) => {
            if (!response || !response.accessToken) {
              this.router.navigate(['/login']);
              return next.handle(req);
            }

            // Save new tokens
            document.cookie = `accesstoken=${response.accessToken}; path=/;`;

            return next.handle(this.addAuthHeader(req, response.accessToken));
          }),
          catchError(() => {
            this.router.navigate(['/login']);
            return next.handle(req);
          })
        );
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return next.handle(req);
      })
    );
  }

  private addAuthHeader(req: HttpRequest<any>, token: string) {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }
}

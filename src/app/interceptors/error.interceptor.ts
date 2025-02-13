import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError, switchMap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { getCookie } from '../utils/getCookie';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/Login';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const refreshToken = getCookie('refreshtoken');
  return next(req).pipe(
    catchError((err) => {
      if (err.status === 403) {
        if (refreshToken !== null) {
          if (!authService.isAuthenticated({ token: refreshToken })) {
            document.cookie = 'accesstoken=; path:/;';
            document.cookie = 'refreshtoken=; path:/;';
            router.navigate(['/login']);
          } else {
            return authService.refresh({ refreshToken: refreshToken }).pipe(
              switchMap((response: LoginResponse) => {
                const newAccessToken = response.accessToken;
                const newReq = req.clone({
                  headers: req.headers.set(
                    'Authorization',
                    `Bearer ${newAccessToken}`
                  ),
                });
                return next(newReq);
              })
            );
          }
        }
      }
      return throwError(err);
    })
  );
};

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { getCookie } from '../utils/getCookie';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    const refreshtoken = getCookie('refreshtoken');
    if (refreshtoken !== null) {
      return this.authService.isAuthenticated({ token: refreshtoken }).pipe(
        map((authenticated) => {
          if (authenticated) {
            this.router.navigate(['/doctorHome']);
            return false;
          }
          return true;
        })
      );
    }
    return of(true);
  }
}

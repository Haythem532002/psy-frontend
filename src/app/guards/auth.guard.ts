import { CanActivate, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { getCookie } from '../utils/getCookie';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
    const refreshtoken = getCookie('refreshtoken');
    if (refreshtoken !== null) {
      return this.authService.isAuthenticated({ token: refreshtoken }).pipe(
        map((authenticated) => {
          if (!authenticated) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        })
      );
    }
    this.router.navigate(['/login']);
    return of(false);
  }
}

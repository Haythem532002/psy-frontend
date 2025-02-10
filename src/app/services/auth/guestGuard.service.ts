import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './authService.service';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map((authenticated) => {
        if (!authenticated) {
          return true;
        } else {
          this.router.navigate(['/doctorHome']);
          return false;
        }
      })
    );
  }
}

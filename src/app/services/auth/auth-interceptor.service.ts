import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Read the JWT token from cookies
    const token = this.getCookie('jwt'); // Assuming your JWT is stored in a "jwt" cookie

    console.log('Intercept');

    if (token) {
      // Clone request and add the Authorization header
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req);
  }



  private getCookie(cookieName: string) {
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      const cookiePair = cookie.split('=');
      const name = cookiePair[0].trim();

      if (name === cookieName) {
        return decodeURIComponent(cookiePair[1]);
      }
    }

    return null;
  }
}

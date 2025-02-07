import {
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export function authIntercepting(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const token = getCookie('jwt');

  console.log('Intercept');

  console.log(token);

  if (token) {
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }
  }

  return next(req);
}

function getCookie(cookieName: string) {
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

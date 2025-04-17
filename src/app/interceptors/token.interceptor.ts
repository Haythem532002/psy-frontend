import { HttpInterceptorFn } from '@angular/common/http';
import { getCookie } from '../utils/getCookie';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('[Interceptor] Intercepting:', req.url);

  let accessToken = getCookie('accesstoken');
  let newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
  });
  return next(newReq);
};

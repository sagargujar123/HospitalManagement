import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../../features/auth/services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken(); 

  if (token) {
    // Clone request and attach Authorization header
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(authReq);
  }

  return next(req);
};

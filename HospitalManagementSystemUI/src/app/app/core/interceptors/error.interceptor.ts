import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service'
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toaster = inject(ToasterService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';

      if (error) {
        switch (error.status) {
          case 0:
            errorMessage = 'Network error. Please check your connection.';
            break;

          case 401:
            errorMessage = 'Unauthorized! Please log in again.';
            router.navigate(['/auth/login']); // redirect to login
            break;

          case 403:
            errorMessage = 'Access denied!';
            break;

          case 500:
          case 501:
          case 502:
          case 503:
            errorMessage = 'Server error! Please try again later.';
            break;

          default:
            errorMessage = error.error?.message || 'An unexpected error occurred.';
            break;
        }
      }
      toaster.error(errorMessage);
      return throwError(() => error);
    })
  );
};

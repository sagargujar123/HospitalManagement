import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // router instance
  const authService = inject(AuthService);

  if (!authService.isLoggedIn()) {
    return router.parseUrl('/auth/login'); // Not logged in → redirect to login
  }

  const requiredRoles = route.data?.['roles'] as string[]; // roles defined in routes

  if (!requiredRoles || authService.hasRole(requiredRoles)) {
    return true; // either no role restriction OR role matches
  }

  return router.parseUrl('/unauthorized'); // role mismatch → redirect
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    const userRole = authService.getRole();
    const defaultRoute = authService.getDefaultRouteForRole(userRole);

    if (state.url.startsWith(defaultRoute)) {
      return true; // already at default route, don’t redirect
    }
    return router.parseUrl(defaultRoute);
  }
  return true;
};

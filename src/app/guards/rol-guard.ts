import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth';

export const rolGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const role = auth.role();

  const currentUrl = state.url;

  if (role === 'foodie' && !currentUrl.includes('/profile/user')) {
    router.navigate(['/profile/user']);
    return false;
  }

  if (role === 'partner' && !currentUrl.includes('/profile/partner')) {
    router.navigate(['/profile/partner']);
    return false;
  }

  return true;
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth';

export const rolGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const url = state.url;

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  if (auth.isPartner()) {
    if (url === '/profile/partner') return true;
    router.navigate(['/profile/partner']);
    return false;
  }

  if (auth.isFoodie()) {
    if (url === '/profile/user') return true;
    router.navigate(['/profile/user']);
    return false;
  }

  return false;
};

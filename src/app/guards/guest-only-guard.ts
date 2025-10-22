import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth';

export const guestOnlyGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    router.navigate(['/feed']);
    return false;
  }

  return true;
};

// guardián encargado de proteger rutas que solo deben ser accesibles por usuarios no autenticados
// si el usuario está autenticado, se redirige a la página de inicio

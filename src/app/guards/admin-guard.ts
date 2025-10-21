import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn() && auth.isAdmin()) return true;

  router.navigate(['/login']);
  return false;
};

// guardián encargado de proteger rutas que requieren rol de administrador
// si el usuario no es administrador o no está autenticado, se redirige a la página de login

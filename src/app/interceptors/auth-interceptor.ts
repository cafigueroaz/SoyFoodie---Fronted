import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../features/auth/services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  if (token) {
    const withAuth = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(withAuth);
  }

  return next(req);
};

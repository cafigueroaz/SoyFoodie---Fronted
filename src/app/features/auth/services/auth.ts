import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'auth_token_demo';

  // Simulación simple: acepta cualquier par no vacío
  loginMock(email: string, password: string): boolean {
    const success = !!email && !!password;
    if (success) {
      localStorage.setItem(this.KEY, 'demo-token');
    }
    return success;
  }

  logout(): void {
    localStorage.removeItem(this.KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.KEY);
  }
}

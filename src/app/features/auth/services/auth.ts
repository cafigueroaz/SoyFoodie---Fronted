import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'auth_token_demo';

  // Simulación simple: acepta cualquier par no vacío
  loginMock(a: string, b: string) {
    return a + b;
  }
}

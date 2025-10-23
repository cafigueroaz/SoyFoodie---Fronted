import { Injectable, signal, computed } from '@angular/core';

type Role = 'admin' | 'user' | 'partner';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Mantén esta constante: define la clave de almacenamiento local
  private readonly KEY_TOKEN = 'auth_token_demo';
  private readonly KEY_ROLE = 'auth_role_demo';

  // Signals: estado reactivo global
  private _user = signal<{ name: string; email: string } | null>(null);
  private _role = signal<Role | null>(null);
  private _exp = signal<number | null>(null);

  user = computed(() => this._user());
  role = computed(() => this._role());
  exp = computed(() => this._exp());

  constructor() {
    const token = localStorage.getItem(this.KEY_TOKEN);
    const role = localStorage.getItem(this.KEY_ROLE) as Role | null;

    if (token && role) {
      this._user.set({ name: 'Usuario', email: 'user@finbit.dev' });
      this._role.set(role);
    }
  }

  // ---- Generación de un JWT simulado (solo para clase) ----
  private makeFakeJWT(payload: object): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body = btoa(JSON.stringify(payload));
    const sign = btoa('FinBitFakeSignature'); // solo decorativo
    return `${header}.${body}.${sign}`;
  }

  // ---- Decodificador robusto (payload → objeto) ----
  private readPayload(token: string): any | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const text = atob(parts[1]);
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  // Carga de usuario simulado
  loadUser() {
    setTimeout(() => {
      this._user.set({ name: 'Alek Segura', email: 'alek@test.dev' });
    }, 1500);
  }

  // Simulación simple de login
  login(email: string, password: string): boolean {
    if (!email || !password) return false;

    const asUser = /user/i.test(email);
    const role: Role = asUser ? 'user' : 'partner';
    const exp = Math.floor(Date.now() / 1000) + 60 * 30; // expira en 30 min
    const token = this.makeFakeJWT({
      name: email.split('@')[0],
      email,
      role,
      exp,
    });

    localStorage.setItem(this.KEY_TOKEN, token);
    localStorage.setItem(this.KEY_ROLE, role);

    this._user.set({ name: email.split('@')[0], email });
    this._role.set(role);
    this._exp.set(exp);
    return true;
  }

  register(data: {
    name: string;
    email: string;
    password: string;
    type: Role;
  }): boolean {
    if (!data.name || !data.email || !data.password) return false;
    const exp = Math.floor(Date.now() / 1000) + 60 * 30;
    const token = this.makeFakeJWT({
      name: data.name,
      email: data.email,
      role: data.type,
      exp,
    });
    localStorage.setItem(this.KEY_TOKEN, token);
    localStorage.setItem(this.KEY_ROLE, data.type);
    this._user.set({ name: data.name, email: data.email });
    this._role.set(data.type);
    this._exp.set(exp);
    return true;
  }

  getToken(): string | null {
    return localStorage.getItem(this.KEY_TOKEN);
  }

  getDecoded(): any | null {
    const t = this.getToken();
    return t ? this.readPayload(t) : null;
  }

  // Cierre de sesión
  logout() {
    localStorage.removeItem(this.KEY_TOKEN);
    localStorage.removeItem(this.KEY_ROLE);
    this._user.set(null);
    this._role.set(null);
  }

  // Verificación de sesión
  isLoggedIn(): boolean {
    const d = this.getDecoded();
    if (!d) return false;
    // Check exp en el cliente para UX (el backend siempre valida igual)
    if (typeof d.exp === 'number' && d.exp * 1000 < Date.now()) {
      this.logout();
      return false;
    }
    return true;
  }

  isAdmin(): boolean {
    const d = this.getDecoded();
    return d?.role === 'admin';
  }

  isUser(): boolean {
    const d = this.getDecoded();
    return d?.role === 'user';
  }

  isPartner(): boolean {
    const d = this.getDecoded();
    return d?.role === 'partner';
  }
}

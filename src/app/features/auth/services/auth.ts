import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type Role = 'admin' | 'user' | 'partner';

interface LoginDto {
  email: string;
  password: string;
}

interface RegisterDto {
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  password: string;
  type: Role;
  // Campos opcionales según tipo
  age?: string;
  address?: string;
  ownerName?: string;
  phone?: string;
  schedule?: string;
}

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly KEY_TOKEN = 'auth_token';
  private readonly KEY_ROLE = 'auth_role';

  private _user = signal<Record<string, any> | null>(null);
  private _role = signal<Role | null>(null);
  private _exp = signal<number | null>(null);

  user = computed(() => this._user());
  role = computed(() => this._role());
  exp = computed(() => this._exp());

  private http = inject(HttpClient);
  private API = 'http://localhost:10000';

  constructor() {
    const token = localStorage.getItem(this.KEY_TOKEN);
    const role = localStorage.getItem(this.KEY_ROLE) as Role | null;

    if (token && role) {
      this.setSessionFromToken(token);
    }
  }

  // ---------------------------
  // Sesión: set desde un token
  // ---------------------------
  private setSessionFromToken(token: string) {
    localStorage.setItem(this.KEY_TOKEN, token);
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload?.type) localStorage.setItem(this.KEY_ROLE, payload.type);

      const name = payload?.email ? payload.email.split('@')[0] : 'Usuario';
      this._user.set({ name, email: payload?.email || '' });
      this._role.set(payload?.type ?? null);
      this._exp.set(typeof payload?.exp === 'number' ? payload.exp : null);
    } catch {
      this.logout();
    }
  }

  // ---------------------------
  // Login real
  // ---------------------------
  loginHttp(dto: LoginDto): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.API}/auth/login`, dto);
  }

  // ---------------------------
  // Registro real
  // ---------------------------
  registerHttp(dto: RegisterDto): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.API}/auth/register`, dto);
  }

  // ---------------------------
  // Helpers de sesión
  // ---------------------------
  applyToken(token: string) {
    this.setSessionFromToken(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.KEY_TOKEN);
  }

  getDecoded(): any | null {
    const t = this.getToken();
    if (!t) return null;
    try {
      return JSON.parse(atob(t.split('.')[1]));
    } catch {
      return null;
    }
  }

  logout() {
    localStorage.removeItem(this.KEY_TOKEN);
    localStorage.removeItem(this.KEY_ROLE);
    this._user.set(null);
    this._role.set(null);
    this._exp.set(null);
  }

  isLoggedIn(): boolean {
    const d = this.getDecoded();
    if (!d) return false;

    // Si está expirado, devuelve false (sin cerrar sesión directamente)
    if (typeof d.exp === 'number' && d.exp * 1000 < Date.now()) {
      return false;
    }

    return true;
  }

  isAdmin(): boolean {
    const d = this.getDecoded();
    return d?.type === 'admin';
  }

  isUser(): boolean {
    const d = this.getDecoded();
    return d?.type === 'user';
  }

  isPartner(): boolean {
    const d = this.getDecoded();
    return d?.type === 'partner';
  }
}

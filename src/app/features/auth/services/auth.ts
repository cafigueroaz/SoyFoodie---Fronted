import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

type Role = 'admin' | 'foodie' | 'partner';

interface User {
  id?: string;
  name?: string;
  nickname?: string;
  email?: string;
  role?: Role;
  savedPartners?: string[];
  age?: number | string;
}

interface LoginDto {
  email: string;
  password: string;
}

interface RegisterDto {
  name: string;
  nickname: string;
  email: string;
  password: string;
  role: Role;

  age?: string | number;
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

  private _user = signal<User | null>(null);
  private _role = signal<Role | null>(null);
  private _exp = signal<number | null>(null);

  user = computed(() => this._user());
  role = computed(() => this._role());
  exp = computed(() => this._exp());

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  private http = inject(HttpClient);
  private API = 'http://localhost:10000';

  constructor() {
    const token = localStorage.getItem(this.KEY_TOKEN);
    if (token) {
      this.setSessionFromToken(token);
      this.fetchUser().subscribe({ error: () => this.logout() });
    }
  }

  /** Obtiene datos del usuario logueado */
  me(): Observable<User> {
    const token = this.getToken();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
    return this.http.get<User>(`${this.API}/users/me`, { headers });
  }

  /** Actualiza la información del usuario en memoria y BehaviorSubject */
  fetchUser(): Observable<User> {
    return this.me().pipe(
      tap((user) => {
        if (user) {
          const roleFromUser = user.role ?? null;
          if (roleFromUser) {
            localStorage.setItem(this.KEY_ROLE, roleFromUser);
            this._role.set(roleFromUser);
          }

          // Ajuste: Aseguramos que todas las propiedades sean opcionales y tipadas
          this._user.set({
            id: user.id ?? (user as any)._id,
            name: user.name,
            email: user.email,
            nickname: user.nickname,
            role: user.role,
          });

          this.userSubject.next(this._user());
        }
      }),
      catchError((err) => {
        this.userSubject.next(null);
        return throwError(() => err);
      })
    );
  }

  /** Decodifica el token y guarda sesión local */
  private setSessionFromToken(token: string) {
    localStorage.setItem(this.KEY_TOKEN, token);
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload?.role || null;
      if (role) localStorage.setItem(this.KEY_ROLE, role);

      const name = payload?.email ? payload.email.split('@')[0] : 'Usuario';
      this._user.set({
        name,
        email: payload?.email || '',
        role,
      });
      this._role.set(role);
      this._exp.set(typeof payload?.exp === 'number' ? payload.exp : null);
    } catch {
      this.logout();
    }
  }

  /** Peticiones HTTP de autenticación */
  loginHttp(dto: LoginDto): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.API}/auth/login`, dto);
  }

  registerHttp(dto: RegisterDto): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.API}/auth/register`, dto);
  }

  /** Aplica un token manualmente y obtiene los datos del usuario */
  applyToken(token: string) {
    this.setSessionFromToken(token);
    this.fetchUser().subscribe({
      next: () => {},
      error: () => this.logout(),
    });
  }

  /** Utilidades */
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
    this.userSubject.next(null);
  }

  /** Verificaciones de sesión */
  isLoggedIn(): boolean {
    const d = this.getDecoded();
    if (!d) return false;
    if (typeof d.exp === 'number' && d.exp * 1000 < Date.now()) {
      return false;
    }
    return true;
  }

  isAdmin(): boolean {
    const d = this.getDecoded();
    return d?.role === 'admin';
  }

  isFoodie(): boolean {
    const d = this.getDecoded();
    return d?.role === 'foodie';
  }

  isPartner(): boolean {
    const d = this.getDecoded();
    return d?.role === 'partner';
  }
}

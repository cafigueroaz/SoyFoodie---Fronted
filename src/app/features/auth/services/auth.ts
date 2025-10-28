import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

type Role = 'admin' | 'foodie' | 'partner';

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

  private _user = signal<Record<string, any> | null>(null);
  private _role = signal<Role | null>(null);
  private _exp = signal<number | null>(null);

  user = computed(() => this._user());
  role = computed(() => this._role());
  exp = computed(() => this._exp());

  private userSubject = new BehaviorSubject<Record<string, any> | null>(null);
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

  me(): Observable<any> {
    const token = this.getToken();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
    return this.http.get<any>(`${this.API}/users/me`, { headers });
  }
  fetchUser(): Observable<any> {
    return this.me().pipe(
      tap((user) => {
        if (user) {
          const roleFromUser = user.role ?? null;
          if (roleFromUser) {
            localStorage.setItem(this.KEY_ROLE, roleFromUser);
            this._role.set(roleFromUser);
          }

          this._user.set({
            id: user._id ?? user.id,
            name: user.name,
            email: user.email,
            nickname: user.nickname,
          });

          this.userSubject.next(this._user());
        }
      }),
      catchError((err) => {
        this.userSubject.next(null);
        throw err;
      })
    );
  }

  private setSessionFromToken(token: string) {
    localStorage.setItem(this.KEY_TOKEN, token);
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload?.role || null;
      if (role) localStorage.setItem(this.KEY_ROLE, role);

      const name = payload?.email ? payload.email.split('@')[0] : 'Usuario';
      this._user.set({ name, email: payload?.email || '' });
      this._role.set(role);
      this._exp.set(typeof payload?.exp === 'number' ? payload.exp : null);
    } catch {
      this.logout();
    }
  }

  loginHttp(dto: LoginDto): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.API}/auth/login`, dto);
  }

  registerHttp(dto: RegisterDto): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.API}/auth/register`, dto);
  }

  applyToken(token: string) {
    this.setSessionFromToken(token);

    this.fetchUser().subscribe({
      next: () => {},
      error: () => {
        this.logout();
      },
    });
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
    if (typeof d.exp === 'number' && d.exp * 1000 < Date.now()) {
      return false;
    }

    return true;
  }

  isAdmin(): boolean {
    const d = this.getDecoded();
    return d?.type === 'admin';
  }

  isFoodie(): boolean {
    const d = this.getDecoded();
    return d?.type === 'user';
  }

  isPartner(): boolean {
    const d = this.getDecoded();
    return d?.type === 'partner';
  }
}

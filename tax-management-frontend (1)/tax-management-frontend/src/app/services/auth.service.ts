import { Injectable, computed, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AdminSession } from '../models/admin';

const TOKEN_KEY = 'otr_token';

interface LoginResponse {
  token: string;
  admin: AdminSession;
}

/**
 * AuthService — talks to the Spring Boot backend's /api/auth endpoints.
 * The JWT is kept in sessionStorage (cleared when the tab closes) and
 * attached to every request by AuthInterceptor. The admin's info is kept
 * in a signal so components re-render automatically when it changes.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _currentAdmin = signal<AdminSession | null>(null);
  private readonly _loginError = signal<string | null>(null);

  readonly currentAdmin = this._currentAdmin.asReadonly();
  readonly loginError = this._loginError.asReadonly();
  readonly isAuthenticated = computed(() => this._currentAdmin() !== null);

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    this._loginError.set(null);

    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(
        map((res) => {
          sessionStorage.setItem(TOKEN_KEY, res.token);
          this._currentAdmin.set(res.admin);
          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          this._loginError.set(
            error.error?.message ?? "Nom d'utilisateur ou mot de passe incorrect."
          );
          return of(false);
        })
      );
  }

  /**
   * Called once at app startup (see app.config.ts). If a token is already
   * stored, validates it against the server and restores the admin session;
   * if it's missing or no longer valid, makes sure we're logged out.
   */
  restoreSession(): Observable<void> {
    const token = this.getToken();
    if (!token) {
      return of(void 0);
    }

    return this.http.get<AdminSession>(`${environment.apiUrl}/auth/me`).pipe(
      tap((admin) => this._currentAdmin.set(admin)),
      map(() => void 0),
      catchError(() => {
        this.logout();
        return of(void 0);
      })
    );
  }

  updateProfile(changes: { fullName: string; email: string; phone: string }): Observable<AdminSession> {
    return this.http
      .put<AdminSession>(`${environment.apiUrl}/auth/me`, changes)
      .pipe(tap((admin) => this._currentAdmin.set(admin)));
  }

  logout(): void {
    this._currentAdmin.set(null);
    sessionStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}

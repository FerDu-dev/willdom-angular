import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthUser } from '../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private STORAGE_KEY = 'willdom_auth_token';

    login(email: string, password: string): Observable<AuthUser> {
        // Simulando delay de red
        if (email === 'admin@willdom.com' && password === 'admin123') {
            const user: AuthUser = {
                id: '1',
                email: email,
                name: 'Admin User',
                token: 'mock-jwt-token-' + Math.random().toString(36).substr(2)
            };
            this.saveToken(user.token);
            return of(user).pipe(delay(1000));
        }
        return throwError(() => new Error('Credenciales inválidas')).pipe(delay(1000));
    }

    logout(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    getToken(): string | null {
        return localStorage.getItem(this.STORAGE_KEY);
    }

    private saveToken(token: string): void {
        localStorage.setItem(this.STORAGE_KEY, token);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}

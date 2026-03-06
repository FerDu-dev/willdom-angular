import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AuthActions } from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    private readonly actions$ = inject(Actions);
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    initAuth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.initAuth),
            map(() => {
                const token = this.authService.getToken();
                if (token) {
                    // In a real app, we might want to validate the token with a dedicated endpoint
                    // For now, we'll assume the token is valid and hydrate a mock user
                    const user = {
                        id: '1',
                        email: 'admin@willdom.com',
                        name: 'Admin User',
                        token
                    };
                    return AuthActions.loginSuccess({ user });
                }
                return { type: 'noop' };
            })
        )
    );

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            mergeMap(({ email, password }) =>
                this.authService.login(email, password).pipe(
                    map((user) => AuthActions.loginSuccess({ user })),
                    catchError((error) => of(AuthActions.loginFailure({ error: error.message })))
                )
            )
        )
    );

    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(() => this.router.navigate(['/dashboard']))
            ),
        { dispatch: false }
    );

    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logout),
                tap(() => {
                    this.authService.logout();
                    this.router.navigate(['/login']);
                })
            ),
        { dispatch: false }
    );
}

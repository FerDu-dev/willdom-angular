import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    AuthActions,
    selectUser,
    selectIsAuthenticated,
    selectAuthLoading,
    selectAuthError
} from '@willdom-test/users-lib';

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {
    private readonly store = inject(Store);

    user$ = this.store.select(selectUser);
    isAuthenticated$ = this.store.select(selectIsAuthenticated);
    loading$ = this.store.select(selectAuthLoading);
    error$ = this.store.select(selectAuthError);

    login(email: string, password: string): void {
        this.store.dispatch(AuthActions.login({ email, password }));
    }

    logout(): void {
        this.store.dispatch(AuthActions.logout());
    }
}

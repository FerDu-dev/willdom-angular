import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from '../../models/auth.model';
import { AuthActions } from './auth.actions';

export const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

export const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,
        on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
        on(AuthActions.loginSuccess, (state, { user }) => ({
            ...state,
            user,
            isAuthenticated: true,
            loading: false,
        })),
        on(AuthActions.loginFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error,
        })),
        on(AuthActions.logout, () => initialState),
    ),
});

export const {
    name,
    reducer,
    selectAuthState,
    selectUser,
    selectIsAuthenticated,
    selectLoading,
    selectError,
} = authFeature;

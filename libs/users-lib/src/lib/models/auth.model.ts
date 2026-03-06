export interface AuthUser {
    id: string;
    email: string;
    name: string;
    token: string;
}

export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

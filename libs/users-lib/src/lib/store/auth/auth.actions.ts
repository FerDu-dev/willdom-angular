import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthUser } from '../../models/auth.model';

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Login': props<{ email: string; password: string }>(),
        'Login Success': props<{ user: AuthUser }>(),
        'Login Failure': props<{ error: string }>(),
        'Logout': emptyProps(),
        'Init Auth': emptyProps(),
    }
});

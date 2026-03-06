import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
        'Load Users': emptyProps(),
        'Load Users Success': props<{ users: User[] }>(),
        'Load Users Failure': props<{ error: string }>(),
        'Set Filter': props<{ filter: string }>(),
        'Set Page Size': props<{ pageSize: number }>(),
        'Set Page Index': props<{ pageIndex: number }>(),
        'Set Column Filter': props<{ column: string; value: string }>(),
        'Reset Filters': emptyProps(),
    }
});

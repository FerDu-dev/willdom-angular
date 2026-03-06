import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { UsersActions } from './users.actions';

@Injectable()
export class UsersEffects {
    private readonly actions$ = inject(Actions);
    private readonly userService = inject(UserService);

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loadUsers),
            mergeMap(() =>
                this.userService.getUsers().pipe(
                    map((users) => UsersActions.loadUsersSuccess({ users })),
                    catchError((error) => of(UsersActions.loadUsersFailure({ error: error.message })))
                )
            )
        )
    );
}

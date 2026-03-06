import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthFacade } from '@willdom-test/users-lib';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
    const authFacade = inject(AuthFacade);
    const router = inject(Router);

    return authFacade.isAuthenticated$.pipe(
        take(1),
        map(isAuth => {
            if (isAuth) {
                return true;
            }
            return router.createUrlTree(['/login']);
        })
    );
};

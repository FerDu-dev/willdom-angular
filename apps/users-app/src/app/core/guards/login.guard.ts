import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthFacade } from '@willdom-test/users-lib';
import { map, take } from 'rxjs/operators';

export const loginGuard: CanActivateFn = () => {
    const authFacade = inject(AuthFacade);
    const router = inject(Router);

    return authFacade.isAuthenticated$.pipe(
        take(1),
        map(isAuth => {
            if (isAuth) {
                // If already logged in, go to dashboard
                return router.createUrlTree(['/dashboard']);
            }
            return true;
        })
    );
};

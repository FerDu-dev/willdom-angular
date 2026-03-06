import { Route } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';
import { MainLayoutComponent } from './core/layout/main-layout.component';

export const appRoutes: Route[] = [
    {
        path: 'login',
        canActivate: [loginGuard],
        loadComponent: () => import('./features/login').then(m => m.LoginComponent)
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard').then(m => m.DashboardComponent)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard' // AuthGuard on root will catch this if not logged in
    }
];

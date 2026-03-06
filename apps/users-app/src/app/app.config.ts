import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  UsersEffects,
  usersFeature,
  AuthEffects,
  authFeature
} from '@willdom-test/users-lib';
import { TUI_SANITIZER } from '@taiga-ui/legacy';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

export const appConfig: ApplicationConfig = {
  providers: [
    NG_EVENT_PLUGINS,
    provideAnimations(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore({
      [usersFeature.name]: usersFeature.reducer,
      [authFeature.name]: authFeature.reducer
    }),
    provideEffects(UsersEffects, AuthEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    }
  ],
};

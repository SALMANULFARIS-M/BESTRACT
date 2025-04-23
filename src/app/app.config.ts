import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,withInMemoryScrolling({
    scrollPositionRestoration: 'enabled', // ✅ Scrolls to top on route change
    anchorScrolling: 'enabled',           // ✅ Enables #anchor navigation
  })), provideClientHydration(withEventReplay()),
    importProvidersFrom(BrowserAnimationsModule),
    provideAnimations(),
  ]
};

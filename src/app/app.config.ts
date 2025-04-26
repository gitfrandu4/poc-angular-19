import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// Firebase integration
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from './firebase.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Initialize Firebase
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    // Provide Firebase Storage
    provideStorage(() => getStorage()),
  ]
};

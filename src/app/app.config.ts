import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Provide Firestore Database
import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';

// Firebase integration
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { firebaseConfig } from './firebase.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Initialize Firebase
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    // Provide Firebase Storage
    provideFirestore(() => getFirestore())
  ]
};

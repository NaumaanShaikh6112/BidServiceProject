import 'zone.js';  // Required by Angular
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { provideAnimations } from '@angular/platform-browser/animations';


import { provideHttpClient, withFetch } from '@angular/common/http';
bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations()
  ]
});

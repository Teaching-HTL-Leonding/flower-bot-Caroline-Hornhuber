import { ApplicationConfig, provideZoneChangeDetection, SecurityContext } from '@angular/core';
import { provideRouter } from '@angular/router';

import {MarkdownService, SECURITY_CONTEXT} from "ngx-markdown";
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    MarkdownService,
    {
      provide: SECURITY_CONTEXT, useValue: SecurityContext.HTML
    }
  ]
};

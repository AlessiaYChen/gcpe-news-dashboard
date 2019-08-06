import { Injectable } from '@angular/core';
import { AppInsights } from 'applicationinsights-js';
declare const appInsights: any;

@Injectable()
export class AppInsightsService {
  private config: {
    instrumentationKey: '60339b85-3aca-4900-a1ad-e8a71341d342'
  };

  constructor() {
    if (!window['appInsights'].config) {
      // Setup Application Insights within the Angular Application
      window['appInsights'].loadAppInsights();
    }
  }

  logPageView(name: string, url?: string, properties?: any, measurements?: any, duration?: number) {
    appInsights.trackPageView({name: name, url: url, properties: properties, measurements: measurements, duration: duration});
  }

  logEvent(name: string, properties?: any, measurements?: any) {
    appInsights.trackEvent({name: name, properties: properties, measurements: measurements});
  }

  logSetAuthenticatedUserContext(authenticatedUserId: string, accountId?: string, storeInCookie = false) {
    appInsights.setAuthenticatedUserContext({authenticatedUserId: authenticatedUserId, accountId: accountId, storeInCookie: storeInCookie});
  }

  logClearAuthenticatedUserContext() {
    appInsights.clearAuthenticatedUserContext();
  }
}

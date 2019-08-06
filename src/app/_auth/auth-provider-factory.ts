import { AppConfigService } from '../app-config.service';
import { KeycloakService } from './keycloak.service';
import { MsalService } from './msal.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { AppInsightsService } from '../services/applicationInsights.service';

export function AuthProviderFactory(appConfig: AppConfigService, oauth: OAuthService, appInsightsService: AppInsightsService) {
  if (appConfig.config.AUTH_TYPE === 'Keycloak') {
    return new KeycloakService(oauth, appConfig);
  } else if (appConfig.config.AUTH_TYPE === 'AzureAD') {
    return new MsalService();
  }
}

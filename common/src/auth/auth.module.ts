import { AuthConfig } from './config';
import { AuthenticatedGuard, UnauthenticatedGuard } from './guards';
import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenExpiredInterceptor } from './interceptors';
import { CookieModule } from '../cookie';

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule,
    CookieModule
  ],
  providers: [
    AuthenticatedGuard,
    UnauthenticatedGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenExpiredInterceptor,
      deps: [AuthConfig, AuthService],
      multi: true
    }
  ]
})
export class AuthModule {
  static forRoot(config: AuthConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: AuthConfig, useValue: config },
        { provide: AuthService, useExisting: config.authService }
      ]
    };
  }
}

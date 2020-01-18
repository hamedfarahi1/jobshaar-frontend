import { Injectable } from '@angular/core';
import { AuthServerProvider } from '@app/core/auth/auth-jwt.service';
import { ICredentials } from '@app/core/auth/credentials.model';
import { Principal } from '@app/core/auth/principal.service';



@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    private principal: Principal,
    private authServerProvider: AuthServerProvider
  ) {
  }

  login(isEmployer: boolean, credentials: ICredentials, callback?: (err?: string) => string): Promise<string | undefined> {
    const cb = callback || function (): void {
    };
    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials, isEmployer).subscribe(
        data => {
          resolve(data);
          return cb();
        },
        err => {
          this.logout();
          reject(err);
          return cb();
        }
      );
    });
  }


  loginWithToken(jwt: string, rememberMe: boolean): Promise<string> {
    return this.authServerProvider.loginWithToken(jwt, rememberMe);
  }

  logout(): void {
    this.authServerProvider.logout().subscribe();
    this.principal.authenticate(undefined);
  }
}

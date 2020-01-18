import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AccountService } from './account.service';
import { IUserIdentity } from './user-indentity.model';

@Injectable({ providedIn: 'root' })
export class Principal {
  private userIdentity: IUserIdentity | undefined;
  private authenticated = false;
  private authenticationState = new Subject<IUserIdentity | undefined>();

  constructor(
    private accountService: AccountService,
  ) { }

  authenticate(identity: IUserIdentity | undefined): void {
    this.userIdentity = identity;
    this.authenticated = identity !== undefined;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[]): Promise<boolean> {
    return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
  }

  hasAnyAuthorityDirect(authorities: string[]): boolean {
    if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
      return false;
    }

    for (let i = 0; i < authorities.length; i++) {
      if (this.userIdentity.authorities.includes(authorities[i])) {
        return true;
      }
    }

    return false;
  }

  hasAuthority(authority: string): Promise<boolean> {
    if (!this.authenticated) {
      return Promise.resolve(false);
    }

    return this.identity().then(
      id => {
        return Promise.resolve(id ? id.authorities && id.authorities.includes(authority) : false);
      },
      () => {
        return Promise.resolve(false);
      }
    );
  }

  identity(force?: boolean): Promise<IUserIdentity | undefined> {
    if (force === true) {
      this.userIdentity = undefined;
    }

    // check and see if we have retrieved the userIdentity data from the server.
    // if we have, reuse it by immediately resolving
    if (this.userIdentity) {
      return Promise.resolve(this.userIdentity);
    }

    // retrieve the userIdentity data from the server, update the identity object, and then resolve.
    return this.accountService
      .get()
      .toPromise()
      .then(response => {
        const account = response.body;
        if (account) {
          this.userIdentity = account;
          this.authenticated = true;
          // this.trackerService.connect();
        } else {
          this.userIdentity = undefined;
          this.authenticated = false;
        }
        this.authenticationState.next(this.userIdentity);
        return this.userIdentity;
      })
      .catch(() => {
        // if (this.trackerService.stompClient && this.trackerService.stompClient.connected) {
        // 	this.trackerService.disconnect();
        // }
        this.userIdentity = undefined;
        this.authenticated = false;
        this.authenticationState.next(this.userIdentity);
        return undefined;
      });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  isIdentityResolved(user: IUserIdentity | undefined): user is IUserIdentity {
    return user !== undefined;
  }

  getAuthenticationState(): Observable<IUserIdentity | undefined> {
    return this.authenticationState.asObservable();
  }

  getImageUrl(): string | undefined {
    return this.isIdentityResolved(this.userIdentity) ? this.userIdentity.imageURL : undefined;
  }
}

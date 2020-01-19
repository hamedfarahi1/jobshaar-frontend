import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AccountService } from '../auth/account.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private _userRole: string = ''
  private _isEmployer: boolean = false;

  constructor(
    private accountService: AccountService,
    private $localStorage: LocalStorageService,
    $sessionStorage: SessionStorageService,
    router: Router
  ) {
    accountService.get().subscribe(res => {
      let user = res.body;
      if (user && user.roleTypeIndex !== undefined) {
        this.setUserRole(user.roleTypeIndex);
      } else {
        new Observable(observer => {
          this.$localStorage.clear('authenticationToken');
          $sessionStorage.clear('authenticationToken');
          this.$localStorage.clear('role');
          observer.complete();
        });
        router.navigate(['account', 'login'])
      }
    })
  }
  public setUserRole(roleName: string) {
    this._isEmployer = roleName == '0';
    this._userRole = this._isEmployer ? '0' : '1'
  }

  public get userRole(): string {
    return this._userRole;
  }

  public get isEmployer(): boolean {
    return this._isEmployer;
  }

  public isEmployerObv(): Observable<boolean> {
    let role = this.userRole;
    if (role == '0' || role == '1') {
      this._isEmployer = role == '0';
      return of(this.isEmployer);
    }
    role = this.$localStorage.retrieve('role');
    if (role == '0' || role == '1') {
      this._isEmployer = role == '0';
      return of(this.isEmployer);
    }
    else
      return this.accountService.get().pipe(
        map(res => {
          if (res.body && res.body.roleTypeIndex !== undefined)
            role = res.body.roleTypeIndex;
          this.$localStorage.store('role', role);
          this._isEmployer = role == '0';
          return this.isEmployer;
        },
          catchError(() => {
            return of(false);
          }))
      )
  }
}

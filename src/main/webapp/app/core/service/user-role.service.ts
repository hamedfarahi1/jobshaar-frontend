import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
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
    private $localStorage: LocalStorageService
  ) {
    accountService.get().subscribe(res => {
      let user = res.body;
      if (user && user.roleTypeIndex) {
        this._userRole = user.roleTypeIndex;
        this.setUserRole(this._userRole);
      }
    })
  }
  public setUserRole(roleName: string) {
    this._isEmployer = roleName === '0';
    this._userRole = this._isEmployer ? roleName : '1'
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
      this._isEmployer = role === '0';
      return of(this.isEmployer);
    }
    role = this.$localStorage.retrieve('role');
    if (role == '0' || role == '1') {
      this._isEmployer = role === '0';
      return of(this.isEmployer);
    }
    else
      return this.accountService.get().pipe(
        map(res => {
          if (res.body && res.body.roleTypeIndex)
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

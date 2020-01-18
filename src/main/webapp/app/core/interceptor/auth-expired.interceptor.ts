import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injector } from '@angular/core';
import { LoginService } from '@app/account-main/account/login/login.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class AuthExpiredInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) { }

  // tslint:disable-next-line:no-any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event) => { },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              const loginService: LoginService = this.injector.get(LoginService);
              loginService.logout();
            }
          }
        }
      )
    );
  }
}

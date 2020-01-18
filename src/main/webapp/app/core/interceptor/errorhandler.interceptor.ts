import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { NetworkActivityService } from '@app/core/service/network-activity/network-activity.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private networkActivityService: NetworkActivityService) {
  }

  intercept(
    // tslint:disable-next-line:no-any
    request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (response) => {
          if (response instanceof HttpResponse)
            this.networkActivityService.appendResponseToBody(request, response);
        },
        (err) => {
          this.networkActivityService.appendResponseToBody(request, err);
          if (err instanceof HttpErrorResponse) {
            if (
              !(
                err.status === 401 &&
                (err.message === '' ||
                  (err.url && err.url.includes('/api/account')))
              )
            ) {
              this.toastr.error("error", err.error, {
                timeOut: 5000,
                closeButton: true,
                positionClass: 'toast-top-center'
              });
            }
          }
        }
      )
    );
  }
}

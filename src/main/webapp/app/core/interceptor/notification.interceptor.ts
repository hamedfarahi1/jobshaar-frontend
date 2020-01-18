import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class NotificationInterceptor implements HttpInterceptor {

	// tslint:disable-next-line: no-unused-variable
	constructor() {

	}

	// tslint:disable-next-line:no-any
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			tap(
				(event) => {
					if (event instanceof HttpResponse) {
						const arr = event.headers.keys();
						// let alert = null;
						// let alertParams = null;
						arr.forEach(entry => {
							if (entry.toLowerCase().endsWith('app-alert')) {
								// alert = event.headers.get(entry);
							} else if (entry.toLowerCase().endsWith('app-params')) {
								// alertParams = event.headers.get(entry);
							}
						});
						// if (alert) {
						//   if (typeof alert === 'string') {
						//     if (this.alertService) {
						//       this.alertService.success(alert, { param: alertParams }, null);
						//     }
						//     handle error
						//   }
						// }
					}
				},
				(err) => { }
			)
		);
	}
}

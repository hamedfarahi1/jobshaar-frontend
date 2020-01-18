import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JalaliMomentDateAdapter } from '@app/core/jalali-moment-adapter/jalali-moment-adapter';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LocalStorageService, NgxWebstorageModule, SessionStorageService } from 'ngx-webstorage';
import { AccountMainModule } from './account-main/account-main.module';
import { AccountModule } from './account-main/account/account.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthExpiredInterceptor } from './core/interceptor/auth-expired.interceptor';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { ErrorHandlerInterceptor } from './core/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './core/interceptor/notification.interceptor';
import { NetworkActivityService } from './core/service/network-activity/network-activity.service';
import { EntityModule } from './entity/entity.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'long', year: 'numeric', day: 'numeric' }
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AccountMainModule,
    AccountModule,
    HomeModule,
    EntityModule,
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot({ prefix: 'app', separator: '-' }),
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
      deps: [Injector]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [LocalStorageService, SessionStorageService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
      deps: [ToastrService, NetworkActivityService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true,
      deps: [Injector]
    },
    { provide: MAT_DATE_LOCALE, useValue: 'fa' },
    { provide: DateAdapter, useClass: JalaliMomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

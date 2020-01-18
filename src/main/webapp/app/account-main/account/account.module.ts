import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompanyKeyValue } from '@app/shared/shared-common/key-value/company-key-value';
import { SharedLibModule } from '@app/shared/shared-lib/shared-lib.module';
import { SharedModule } from '@app/shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    SharedLibModule
  ],
  providers: [
    CompanyKeyValue
  ]
})
export class AccountModule { }

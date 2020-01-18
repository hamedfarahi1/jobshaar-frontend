import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../shared-lib/angular-material/angular-material.module';
import { SharedLibModule } from '../shared-lib/shared-lib.module';
import { BmmtLoadingDirective } from './loading-directive/loading-directive';
import { AbsoluteNumberMomentPipe } from './pipes/absolute-number.pipe';
import { JalaliMomentPipe } from './pipes/jalali-moment.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SpinnerComponent } from './spinner-component/spinner.component';
import { SpinnerResloverComponent } from './spinner-resolver-component/spinner-resolver.component';
import { BmmtUserAccessDirective } from './user-access-directive/user-access-directive';

@NgModule({
  declarations: [BmmtUserAccessDirective, JalaliMomentPipe, SafeHtmlPipe, AbsoluteNumberMomentPipe, BmmtLoadingDirective, SpinnerComponent, SpinnerResloverComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedLibModule
  ],
  entryComponents: [SpinnerComponent],
  exports: [BmmtUserAccessDirective, JalaliMomentPipe, SafeHtmlPipe, AbsoluteNumberMomentPipe, BmmtLoadingDirective, SpinnerComponent, SpinnerResloverComponent]
})
export class SharedCommonModule {
}

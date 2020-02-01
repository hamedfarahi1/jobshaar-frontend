import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedLibModule } from '@app/shared/shared-lib/shared-lib.module';
import { SharedModule } from '@app/shared/shared.module';
import { ResumeListComponent } from './resume-list.component';

@NgModule({
  declarations: [
    ResumeListComponent
  ],
  imports: [
    CommonModule,
    SharedLibModule,
    SharedModule,
  ],
  exports: [ResumeListComponent],
  entryComponents: [ResumeListComponent]
})
export class ResumeModule { }

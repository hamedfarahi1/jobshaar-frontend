import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JobKeyValue } from '@app/shared/shared-common/key-value/job-key-value';
import { JobEnumPipe } from '@app/shared/shared-common/pipes/job-enums.pipe';
import { SharedCommonModule } from '@app/shared/shared-common/shared-common.module';
import { SharedLibModule } from '@app/shared/shared-lib/shared-lib.module';
import { SharedModule } from '@app/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { JobCrudComponent } from './job-crud/job-crud.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job.component';
import { ResumePopupComponent } from './resume-popup/resume-popup.component';

@NgModule({
  declarations: [
    JobComponent,
    JobCrudComponent,
    JobListComponent,
    JobEnumPipe,
    ResumePopupComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    SharedLibModule,
    SharedModule,
    SharedCommonModule,
    AngularEditorModule,
  ],
  exports: [],
  providers: [
    JobKeyValue
  ],
  entryComponents: [ResumePopupComponent]
})
export class JobModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JobModule } from './job/job.module';
import { ResumeModule } from './resume/resume-list/resume-list.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JobModule,
    ResumeModule
  ],
  exports: [
    JobModule,
    ResumeModule
  ]
})
export class EntityModule { }

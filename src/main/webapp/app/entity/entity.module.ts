import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JobModule } from './job/job.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JobModule
  ],
  exports: [
    JobModule
  ]
})
export class EntityModule { }

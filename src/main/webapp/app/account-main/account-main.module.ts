import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './account-main-routing.module';
import { AccountMainComponent } from './account-main.component';




@NgModule({
  declarations: [AccountMainComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class AccountMainModule { }

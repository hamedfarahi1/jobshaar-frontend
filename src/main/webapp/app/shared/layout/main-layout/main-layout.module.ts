import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedLibModule } from '@app/shared/shared-lib/shared-lib.module';
import { HeaderComponent } from '../header/header.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent
  ],
  imports: [CommonModule,
    SharedLibModule,
    MainLayoutRoutingModule],
  exports: [],
  providers: [],
})
export class MainLayoutModule { }

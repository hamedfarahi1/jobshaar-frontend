import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedLibModule } from '@app/shared/shared-lib/shared-lib.module';
import { SharedModule } from '@app/shared/shared.module';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TileComponent } from './tile/tile.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};

@NgModule({
  declarations: [HomeComponent, TileComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedLibModule,
    SharedModule,
    SwiperModule,
    FlexLayoutModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class HomeModule { }

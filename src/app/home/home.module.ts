import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { WeatherModule } from '../weather/weather.module';
import { CalendarModule } from '../calendar/calendar.module';

@NgModule({
  imports: [
    CommonModule,

    WeatherModule,
    CalendarModule
  ],
  exports: [HomeComponent],
  declarations: [HomeComponent]
})
export class HomeModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../shared/shared.module';
import { ClockComponent } from './clock/clock.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule
  ],
  declarations: [ClockComponent, ScheduleComponent, CurrentWeatherComponent, ForecastComponent],
  exports: [ClockComponent, ScheduleComponent, CurrentWeatherComponent, ForecastComponent]
})
export class WidgetsModule { }

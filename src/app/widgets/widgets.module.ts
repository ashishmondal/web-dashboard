import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockComponent } from './clock/clock.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastComponent } from './forecast/forecast.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ClockComponent, ScheduleComponent, CurrentWeatherComponent, ForecastComponent],
  exports: [ClockComponent, ScheduleComponent, CurrentWeatherComponent, ForecastComponent]
})
export class WidgetsModule { }

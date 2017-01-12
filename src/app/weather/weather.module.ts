import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherService } from './weather.service';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SettingsService } from '../settings/settings.service';

import { SharedModule } from '../shared/shared.module';
import { ForecastComponent } from './forecast/forecast.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FlexLayoutModule,

    SharedModule
  ],
  exports: [CurrentWeatherComponent, ForecastComponent],
  providers: [WeatherService, SettingsService],
  declarations: [CurrentWeatherComponent, ForecastComponent]
})
export class WeatherModule { }

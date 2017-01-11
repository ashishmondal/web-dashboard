import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherService } from './weather.service';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SettingsService } from '../settings/settings.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FlexLayoutModule,

    SharedModule
  ],
  exports: [CurrentWeatherComponent],
  providers: [WeatherService, SettingsService],
  declarations: [CurrentWeatherComponent]
})
export class WeatherModule { }

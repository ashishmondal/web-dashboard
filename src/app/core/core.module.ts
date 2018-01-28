import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { BackgroundImageService } from './services/background-image.service';
import { CalendarService } from './services/calendar.service';
import { SettingsService } from './services/settings.service';
import { WeatherService } from './services/weather.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers: [BackgroundImageService, CalendarService, SettingsService, WeatherService]
})
export class CoreModule { }

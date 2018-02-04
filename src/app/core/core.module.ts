import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { BackgroundImageService } from './services/background-image.service';
import { CalendarService } from './services/calendar.service';
import { PlanetaryService } from './services/planetary.service';
import { SettingsService } from './services/settings.service';
import { WeatherService } from './services/weather.service';
import { LocationService } from './services/location.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [BackgroundImageService, CalendarService, SettingsService, WeatherService, PlanetaryService, LocationService]
})
export class CoreModule { }

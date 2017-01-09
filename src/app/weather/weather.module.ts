import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherService } from './weather.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [CurrentWeatherComponent],
  providers: [WeatherService],
  declarations: [CurrentWeatherComponent]
})
export class WeatherModule { }

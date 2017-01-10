import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherService } from './weather.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FlexLayoutModule
  ],
  exports: [CurrentWeatherComponent],
  providers: [WeatherService],
  declarations: [CurrentWeatherComponent]
})
export class WeatherModule { }

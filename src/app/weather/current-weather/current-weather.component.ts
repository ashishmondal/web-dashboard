import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { WeatherService, ICurrentWeather, ZipCodeLocation } from '../weather.service';

@Component({
  selector: 'db-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.fxLayout]': '"column"'
  }
})
export class CurrentWeatherComponent implements OnInit {

  temperatureUnit: string = '°C';  
  weather: ICurrentWeather;

  constructor(private weatherService: WeatherService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    const location = new ZipCodeLocation('77429', 'us');

    this.weatherService.getCurrentWeatherDetails(location)
      .subscribe(weather => {
        this.weather = weather;
        this.cdRef.markForCheck();
      });
  }
}

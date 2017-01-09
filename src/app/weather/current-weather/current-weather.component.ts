import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { WeatherService, ICurrentWeather, CoordinateLocation } from '../weather.service';
import { Temperature, Kelvin, Celsius } from '../../common/units/temperature';

@Component({
  selector: 'db-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentWeatherComponent implements OnInit {

  public get currentTemperature() {
    if (!this.weather) {
      return null;
    }

    return new Temperature(this.weather.main.temp, new Kelvin())
      .setUnit(new Celsius());
  }

  public get cityName() {
    return this.weather.name;
  }

  private weather: ICurrentWeather;

  constructor(private weatherService: WeatherService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      const location = new CoordinateLocation(position.coords.latitude, position.coords.longitude);

      this.weatherService.getCurrentWeatherDetails(location)
        .subscribe(weather => {
          this.weather = weather;
          this.cdRef.markForCheck();
        })
    });
  }

}

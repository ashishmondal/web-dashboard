import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { WeatherService, ICurrentWeather, ZipCodeLocation } from '../weather.service';
import * as moment from 'moment';

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
  sunEventTime: string;
  isSunriseNext = true;
  moonPhase = 0;

  constructor(private weatherService: WeatherService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.weatherService.getCurrentWeatherDetails()
      .subscribe(weather => {
        this.weather = weather;

        const sunrise = moment(weather.sys.sunrise * 1000), sunset = moment(weather.sys.sunset * 1000);
        this.isSunriseNext = sunrise.isBefore(sunset) && moment().isBefore(sunrise);
        this.sunEventTime = (this.isSunriseNext ? sunrise : sunset).format('h:mm A');

        this.moonPhase = this.weatherService.getMoonPhase();
        this.cdRef.markForCheck();
      });
  }
}

import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { WeatherService, ICurrentWeather, ZipCodeLocation } from '../weather.service';
import { Subscription } from 'rxjs/Subscription';
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
export class CurrentWeatherComponent implements OnInit, OnDestroy {

  weather: ICurrentWeather;
  sunEventTime: string;
  isSunriseNext = true;
  moonPhase = 0;
  tempLow = 0;
  tempHigh = 0;

  private currentWeatherSubscription: Subscription;
  private dailyForecastSubscription: Subscription;

  constructor(private weatherService: WeatherService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.currentWeatherSubscription = this.weatherService.currentWeather
      .subscribe(weather => {
        this.weather = weather;

        const sunrise = moment(weather.sys.sunrise * 1000), sunset = moment(weather.sys.sunset * 1000);
        this.isSunriseNext = sunrise.isBefore(sunset) && moment().isBefore(sunrise);
        this.sunEventTime = (this.isSunriseNext ? sunrise : sunset).format('h:mm A');

        this.moonPhase = this.weatherService.getMoonPhase();
        this.cdRef.markForCheck();
      });

    this.dailyForecastSubscription = this.weatherService.dailyForecast
      .subscribe(forecast => {
        const first = forecast.list[0];
        const date = moment(first.dt * 1000);

        if (moment().isSame(date, 'day')) {
          this.tempLow = first.temp.min;
          this.tempHigh = first.temp.max;
        }
      });
  }

  ngOnDestroy() {
    this.currentWeatherSubscription.unsubscribe();
    this.dailyForecastSubscription.unsubscribe();
  }
}

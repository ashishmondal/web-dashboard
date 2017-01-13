import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { WeatherService, IForecast, IForecastTemperature } from '../weather.service';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

@Component({
  selector: 'db-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit, OnDestroy {

  forecasts: Forecast[];

  private dailyForecastSubscription: Subscription;

  constructor(private weatherService: WeatherService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.dailyForecastSubscription = this.weatherService.dailyForecast
      .subscribe(forecast => {
        const today = moment();
        this.forecasts = forecast.list
          .map(f => new Forecast(f))
          .filter(f => !f.date.isSame(today, 'day'));

        this.cdRef.markForCheck();
      }, error => console.log(error));
  }

  ngOnDestroy() {
    this.dailyForecastSubscription.unsubscribe();
  }
}

class Forecast {
  public date: moment.Moment;
  public weatherId: number;
  public temperature: IForecastTemperature;
  public day: string;

  constructor(private forecast: IForecast) {
    this.date = moment(forecast.dt * 1000);
    this.weatherId = forecast.weather[0].id;
    this.temperature = forecast.temp;

    this.day = this.date.format('ddd');
  }
}

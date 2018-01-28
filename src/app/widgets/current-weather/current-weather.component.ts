import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { WeatherService, ICurrentWeather } from '../../core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'db-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {

  weather: ICurrentWeather;
  sunEventTime: string;
  isSunriseNext = true;
  moonPhase = 0;
  tempLow = 0;
  tempHigh = 0;
  private colorMap = [
    [318.15, 298.15, 273.15],
    [0, 90, 210]
  ];


  get date() {
    return moment().format('ddd, d MMM');
  }

  private currentWeatherSubscription: Subscription;
  private dailyForecastSubscription: Subscription;

  constructor(private weatherService: WeatherService, private cdRef: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.currentWeatherSubscription = this.weatherService.currentWeather
      .subscribe(weather => {
        this.weather = weather;

        const sunrise = moment(weather.sys.sunrise * 1000), sunset = moment(weather.sys.sunset * 1000);
        this.isSunriseNext = sunrise.isBefore(sunset) && moment().isBefore(sunrise);
        this.sunEventTime = (this.isSunriseNext ? sunrise : sunset).format('h:mm A');

        this.moonPhase = this.weatherService.getMoonPhase();
        this.cdRef.markForCheck();
      }, error => this.router.navigate(['/settings']));

    this.dailyForecastSubscription = this.weatherService.dailyForecast
      .subscribe(forecast => {
        const first = forecast.list[0];
        const date = moment(first.dt * 1000);

        if (moment().isSame(date, 'day')) {
          this.tempLow = first.temp.min;
          this.tempHigh = first.temp.max;
        }
        this.cdRef.markForCheck();
      }, error => console.log(error));
  }

  ngOnDestroy() {
    this.currentWeatherSubscription.unsubscribe();
    this.dailyForecastSubscription.unsubscribe();
  }

  tempToColor(tempInKelvin: number) {
    const index = this.colorMap[0].findIndex(t => t < tempInKelvin);
    let hue = 0;

    if (index === void 0) {
      hue = 210;
    } else if (index > 0) {
      const
        y0 = this.colorMap[1][index],
        y1 = this.colorMap[1][index - 1],
        x0 = this.colorMap[0][index],
        x1 = this.colorMap[0][index - 1],
        x = tempInKelvin;
      hue = y0 + ((x - x0) / (x1 - x0) * (y1 - y0));
    }
    return `hsl(${hue}, 100%, 50%)`;
  }
}

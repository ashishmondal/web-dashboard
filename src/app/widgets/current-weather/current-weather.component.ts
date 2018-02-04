import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { map, share, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { ICurrentWeather, WeatherService, PlanetaryService, IWeatherCondition } from '../../core';
import { empty } from 'rxjs/observable/empty';


@Component({
  selector: 'db-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {

  public weather$: Observable<ICurrentWeather>;
  public place$: Observable<string>;
  public tempCurrent$: Observable<number>;
  public tempLow$: Observable<number>;
  public tempHigh$: Observable<number>;
  public condition$: Observable<string>;
  public conditionId$: Observable<number>;
  public moonPhase$: Observable<number>;
  public isDayTime$: Observable<boolean>;

  sunEventTime$: Observable<string>;
  isSunriseNext = true;

  private colorMap = [
    [318.15, 298.15, 273.15],
    [0, 90, 210]
  ];

  public date$: Observable<string>;

  private dailyForecastSubscription: Subscription;

  constructor(
    private planetaryService: PlanetaryService,
    private weatherService: WeatherService,
    private cdRef: ChangeDetectorRef,
    private router: Router) {
    this.date$ = timer(0, 1000 * 60).pipe(
      map(t => moment().format('ddd, D MMM'))
    );

    this.weather$ = this.weatherService.currentWeather$;
    this.place$ = this.weather$.pipe(map(w => w.name));
    this.tempCurrent$ = this.weather$.pipe(map(w => w.main.temp));
    this.tempLow$ = this.weather$.pipe(map(w => w.main.temp_min));
    this.tempHigh$ = this.weather$.pipe(map(w => w.main.temp_max));
    this.condition$ = this.weather$.pipe(map(w => w.weather[0].main));
    this.conditionId$ = this.weather$.pipe(map(w => w.weather[0].id));
    this.moonPhase$ = this.planetaryService.moonPhase$;
    this.isDayTime$ = this.date$.pipe(
      switchMap(d => this.planetaryService.sunEvent$),
      map(se => moment().isAfter(moment(se.sunrise)) && moment().isBefore(moment(se.sunset)))
    );
    this.sunEventTime$ = this.planetaryService.sunEvent$.pipe(
      map(se => moment(se.sunset).format('h:mm A'))
    );
  }

  private isDayTime(weather: IWeatherCondition) {

  }

  ngOnInit() {
    // this.currentWeatherSubscription = this.weatherService.currentWeather$
    //   .subscribe(weather => {
    //     this.weather = weather;

    //     const sunrise = moment(weather.sys.sunrise * 1000), sunset = moment(weather.sys.sunset * 1000);
    //     this.isSunriseNext = sunrise.isBefore(sunset) && moment().isBefore(sunrise);
    //     this.sunEventTime = (this.isSunriseNext ? sunrise : sunset).format('h:mm A');

    //     this.moonPhase = this.weatherService.getMoonPhase();
    //     this.cdRef.markForCheck();
    //   }, error => this.router.navigate(['/settings']));

    this.dailyForecastSubscription = this.weatherService.dailyForecast$
      .subscribe(forecast => {
        const first = forecast.list[0];
        const date = moment(first.dt * 1000);

        this.cdRef.markForCheck();
      }, error => console.log(error));
  }

  ngOnDestroy() {
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

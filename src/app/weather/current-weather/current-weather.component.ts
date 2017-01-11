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
  sun: string;

  constructor(private weatherService: WeatherService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    const location = new ZipCodeLocation('77429', 'us');

    this.weatherService.getCurrentWeatherDetails(location)
      .subscribe(weather => {
        this.weather = weather;

        const sunrise = moment(weather.sys.sunrise * 1000), sunset = moment(weather.sys.sunset * 1000);
        if(sunrise.isBefore(sunset)){
          this.sun =  sunrise.format('[Sunrise:] h:mm A');
        } else {
          this.sun =  sunset.format('[Sunset:] h:mm A');
        }

        this.cdRef.markForCheck();
      });
  }
}

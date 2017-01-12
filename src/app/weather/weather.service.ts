import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';

import { SettingsService } from '../settings/settings.service';
import 'rxjs';

@Injectable()
export class WeatherService {

  private apiKey: string;
  private location: IWeatherLocation;

  public currentWeather: Observable<ICurrentWeather>;
  private currentWeatherSubject = new Subject<ICurrentWeather>();

  public dailyForecast: Observable<IDailyForecast>;
  private dailyForecastSubject = new Subject<IDailyForecast>();

  constructor(private http: Http, settingsService: SettingsService) {
    this.apiKey = settingsService.load().owApiKey;
    const loc = settingsService.load().cityId.split(',');
    this.location = new ZipCodeLocation(loc[0], loc[1]);

    this.currentWeather = this.currentWeatherSubject.asObservable();
    this.getCurrentWeatherDetails().subscribe(this.currentWeatherSubject);

    this.dailyForecast = this.dailyForecastSubject.asObservable();
    this.getDailyForecast().subscribe(this.dailyForecastSubject);
  }

  private getCurrentWeatherDetails(): Observable<ICurrentWeather> {
    const url = 'http://api.openweathermap.org/data/2.5/weather';
    const params = this.location.searchParams;
    params.set('appid', this.apiKey);

    return Observable.timer(0, 1000 * 60 * 15) // Update every 15 min
      .flatMap(() => this.http.get(url, { search: params }))
      .map(response => response.json() as ICurrentWeather);
  }

  private getDailyForecast(days = 7): Observable<IDailyForecast> {
    const url = 'http://api.openweathermap.org/data/2.5/forecast/daily';
    const params = this.location.searchParams;
    params.set('appid', this.apiKey);
    params.set('cnt', '' + days);

    return Observable.timer(0, 1000 * 60 * 60) // Update every 1 hour
      .flatMap(() => this.http.get(url, { search: params }))
      .map(response => response.json() as IDailyForecast);
  }

  getMoonPhase(date = new Date()) {
    var lp = 2551443;
    var new_moon = new Date(1970, 0, 7, 20, 35, 0);
    var phase = ((date.getTime() - new_moon.getTime()) / 1000) % lp;
    return Math.floor(phase / (24 * 3600));
  }
}

export interface IDailyForecast {
  city: ICity;
  cnt: number;
  list: IForecast[];
}

export interface ICity {
  id: number;
  name: string;
  coord: ICoordinates;
  country: string;
}

export interface IForecast {
  dt: number;
  temp: IForecastTemperature;
  pressure: number;
  humidity: number;
  weather: IWeatherDescription[];
}

export interface IForecastTemperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};

export interface ICurrentWeather {
  coord: ICoordinates;
  sys: ISystem;
  weather: IWeatherDescription[];
  base: string;
  main: IWeatherCondition;
  wind: IWindCondition;
  clouds: ICloudCondition;
  dt: number;
  id: number;
  name: string;
  cod: number;
}

export interface ICoordinates {
  lat: number;
  lon: number;
}

export interface ISystem {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface IWeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherCondition {
  temp: number;
  humidity: number;
  pressure: number;
  temp_min: number;
  temp_max: number;
}

export interface IWindCondition {
  speed: number;
  deg: number;
}

export interface ICloudCondition {
  all: number;
}

export interface IWeatherLocation {
  searchParams: URLSearchParams;
}

export class CityNameLocation implements IWeatherLocation {
  private _params = new URLSearchParams();
  constructor(name: string, country?: string) {
    this._params.set('q', country ? `${name},${country}` : name);
  }

  get searchParams(): URLSearchParams {
    return this._params;
  }
}

export class CityIdLocation implements IWeatherLocation {
  private _params = new URLSearchParams();
  constructor(id: string) {
    this._params.set('id', id);
  }

  get searchParams(): URLSearchParams {
    return this._params;
  }
}

export class CoordinateLocation implements IWeatherLocation {
  private _params = new URLSearchParams();
  constructor(lat: number, lon: number) {
    this._params.set('lat', '' + lat);
    this._params.set('lon', '' + lon);
  }

  get searchParams(): URLSearchParams {
    return this._params;
  }
}

export class ZipCodeLocation implements IWeatherLocation {
  private _params = new URLSearchParams();
  constructor(zipCode: string, country: string) {
    this._params.set('q', `${zipCode},${country}`);
  }

  get searchParams(): URLSearchParams {
    return this._params;
  }
}


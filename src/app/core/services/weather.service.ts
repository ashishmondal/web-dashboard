import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { LocationService } from './location.service';
import { SettingsService } from './settings.service';
import { ISettings } from './settings.service';

@Injectable()
export class WeatherService {
  public currentWeather$: Observable<ICurrentWeather>;
  public dailyForecast$: Observable<IDailyForecast>;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient, private locationService: LocationService, settingsService: SettingsService) {
    const settings$ = settingsService.getSettings().pipe(shareReplay());

    this.currentWeather$ = settings$.pipe(
      switchMap(settings => this.getCurrentWeatherDetails(settings)),
      shareReplay()
    );

    this.dailyForecast$ = settings$.pipe(
      switchMap(settings => this.getDailyForecast(settings)),
      shareReplay()
    );
  }

  private getCurrentWeatherDetails(settings: ISettings): Observable<ICurrentWeather> {
    const url = 'http://api.openweathermap.org/data/2.5/weather';

    return timer(0, 1000 * 60 * 15).pipe( // Update every 15 min
      switchMap(() => this.locationService.location$),
      map(pos => ({
        appid: settings.owApiKey,
        lat: '' + pos.coords.latitude,
        lon: '' + pos.coords.longitude
      })),
      switchMap<any, ICurrentWeather>(params => this.httpClient.get(url, { params: params }))
    );
  }

  private getDailyForecast(settings: ISettings, days = 7): Observable<IDailyForecast> {
    const url = 'http://api.openweathermap.org/data/2.5/forecast/daily';

    return timer(0, 1000 * 60 * 60).pipe( // Update every 1 hour
      switchMap(() => this.locationService.location$),
      map(pos => ({
        appid: settings.owApiKey,
        lat: '' + pos.coords.latitude,
        lon: '' + pos.coords.longitude,
        cnt: '' + days
      })),
      switchMap<any, IDailyForecast>(params => this.httpClient.get(url, { params: params }))
    );
  }

  public getMoonPhase(date = new Date()) {
    const lp = 2551443;
    const new_moon = new Date(1970, 0, 7, 20, 35, 0);
    const phase = ((date.getTime() - new_moon.getTime()) / 1000) % lp;
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
}

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


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs';

@Injectable()
export class WeatherService {

  private apiKey = 'cc3c044d17320ee69f25d28d84923136';
  private location = '';
  constructor(private http: Http) {

  }

  getCurrentWeatherDetails(location: IWeatherLocation): Observable<ICurrentWeather> {
    const url = 'http://api.openweathermap.org/data/2.5/weather';
    const params = location.searchParams;
    params.set('appid', this.apiKey);

    return Observable.timer(0, 60000)
      .flatMap(() => this.http.get(url, { search: params }))
      .map(response => response.json() as ICurrentWeather);
  }
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

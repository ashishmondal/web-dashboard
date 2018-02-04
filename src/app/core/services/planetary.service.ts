import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { LocationService } from './location.service';
import * as moment from 'moment';

@Injectable()
export class PlanetaryService {

  public moonPhase$: Observable<number>;
  public sunEvent$: Observable<ISunEvent>;

  private minuteClock$ = timer(0, 1000 * 60).pipe(
    map(() => moment()),
    shareReplay()
  );

  constructor(private httpClient: HttpClient, locationService: LocationService) {
    this.moonPhase$ = timer(0, 1000 * 60 * 60).pipe(
      map(t => this.getMoonPhase())
    );

    this.sunEvent$ = this.minuteClock$.pipe(
      switchMap(m => locationService.location$),
      switchMap(position => this.getSunEvent(position.coords)),
      map(sr => sr.results)
    );
  }

  public getSunEvent(coords: Coordinates) {
    const params = {
      lat: '' + coords.latitude,
      lng: '' + coords.longitude,
      formatted: '0'
    };

    return this.httpClient.get<ISunEventResponse>('https://api.sunrise-sunset.org/json', { params: params });
  }

  public getMoonPhase(date = new Date()) {
    const lp = 2551443;
    const newMoon = new Date(1970, 0, 7, 20, 35, 0);
    const phase = ((date.getTime() - newMoon.getTime()) / 1000) % lp;
    return Math.floor(phase / (24 * 3600));
  }
}

export interface ISunEventResponse {
  results: ISunEvent;
  status: string;
}

export interface ISunEvent {
  sunrise: string;
  sunset: string;
  solar_noon: string;
  day_length: number;
  civil_twilight_begin: string;
  civil_twilight_end: string;
  nautical_twilight_begin: string;
  nautical_twilight_end: string;
  astronomical_twilight_begin: string;
  astronomical_twilight_end: string;
}

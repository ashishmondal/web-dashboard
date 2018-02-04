import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { timer } from 'rxjs/observable/timer';
import { map, flatMap } from 'rxjs/operators';

import { SettingsService } from './settings.service';

import * as ical from 'ical';

@Injectable()
export class CalendarService {
  private icalUrl: string;
  private headers: Headers;
  private error: string;

  constructor(private http: Http, settingsService: SettingsService) {
    settingsService.getSettings()
      .subscribe(settings => {
        this.icalUrl = settings.calendarUrl;
        this.headers = new Headers(JSON.parse(settings.calendarUrlHeader));
      }, error => this.error);
  }

  getCalendar() {
    if (this.error) {
      return new ErrorObservable(this.error);
    }

    return timer(0, 1000 * 60 * 60).pipe( // Update every hour
      flatMap(() => this.http.get(this.icalUrl, { headers: this.headers })),
      map(response => ical.parseICS(response.json()) as { [key: string]: IEvent })
    );
  }
}

export interface IEvent {
  start: Date;
  end: Date;
  summary: string;
}

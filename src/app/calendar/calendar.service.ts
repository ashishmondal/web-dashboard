import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SettingsService } from '../settings/settings.service';

import 'rxjs';

let ical = require('ical');

@Injectable()
export class CalendarService {
  private icalUrl: string;
  private headers: Headers;

  constructor(private http: Http, settingsService: SettingsService) {
    const settings = settingsService.load();
    this.icalUrl = settings.calendarUrl;
    this.headers = new Headers(JSON.parse(settings.calendarUrlHeader));
  }

  getCalendar() {
    return Observable.timer(0, 1000 * 60 * 60) // Update every hour
      .flatMap(() => this.http.get(this.icalUrl, { headers: this.headers }))
      .map(response => {
        return ical.parseICS(response.json()) as { [key: string]: IEvent };
      });
  }
}

export interface IEvent {
  start: Date;
  end: Date;
  summary: string;
}

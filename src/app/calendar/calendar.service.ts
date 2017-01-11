import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs';

let ical = require('ical');

@Injectable()
export class CalendarService {
  private readonly icalUrl = 'https://6ilhtkdsqa.execute-api.us-east-1.amazonaws.com/prod/getResource';
  constructor(private http: Http) {

  }

  getCalendar() {
    return Observable.timer(0, 1000 * 60 * 60) // Update every hour
      .flatMap(() => this.http.get(this.icalUrl))
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

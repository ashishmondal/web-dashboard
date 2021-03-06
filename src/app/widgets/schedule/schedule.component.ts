import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CalendarService, IEvent } from '../../core';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';

@Component({
  selector: 'db-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent implements OnInit {

  get upcomingEvents() {

    const es = this.allEvents
      .filter(e => moment().isBefore(e.end))
      .map(e => ({
        month: moment(e.start).format('MMMM'),
        summary: e.summary,
        when: this.getWhen(e)
      }))
      .reduce((months, event) => {
        let month = months.find(m => m.month === event.month);
        if (!month) {
          month = { month: event.month, events: [] };
          months.push(month);
        }
        month.events.push(event);
        return months;
      }, []);
    return es;
  }

  public allEvents: IEvent[];

  constructor(private calendarService: CalendarService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    // this.calendarService.getCalendar()
    //   .subscribe(calendar => {
    //     this.allEvents = Object.keys(calendar)
    //       .map(k => calendar[k])
    //       .sort((a, b) => {
    //         if (moment(a.start).isBefore(b.start)) {
    //           return -1;
    //         }

    //         if (moment(a.start).isAfter(b.start)) {
    //           return 1;
    //         }

    //         return 0;
    //       });
    //     this.cdRef.markForCheck();
    //   });

    // Also, update every minute
    // Observable.interval(1000 * 60)
    //   .subscribe(() => this.cdRef.markForCheck());
  }

  getWhen(event: IEvent) {
    let day = '', time = '';
    const start = moment(event.start);

    if (moment().isSame(start, 'day')) {
      day = 'Today';
    } else if (start.isBetween(moment(), moment().add(7, 'd'), 'd')) {
      day = start.format('ddd');
    } else if (moment().isSame(start, 'year')) {
      day = start.format('D MMM');
    } else {
      day = start.format('D MMM `YY');
    }

    if (!this.isFullDay(event)) {
      time = moment(event.start).format('h:mm A');
    }

    return {
      day: day,
      time: time
    };
  }

  isFullDay(event: IEvent) {
    const start = moment(event.start), end = moment(event.end);
    return start.format('HH:mm') === '00:00' && start.add(1, 'd').isSame(end);
  }
}

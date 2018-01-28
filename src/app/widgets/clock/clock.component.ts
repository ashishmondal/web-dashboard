import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'db-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ClockComponent {

  public time$: Observable<string>;

  constructor() {
    this.time$ = timer(0, 500).pipe(
      map(t => moment().format(t % 2 ? 'h:mm A' : 'h mm A'))
    );
  }

}

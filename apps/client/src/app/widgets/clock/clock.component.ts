import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'db-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ClockComponent {

  public hour$: Observable<string>;
  public tick$: Observable<string>;
  public rest$: Observable<string>;

  constructor() {
    this.hour$ = timer(0, 500).pipe(map(t => moment().format('h')));
    this.tick$ = timer(0, 500).pipe(map(t => t % 2 ? ':' : '\xa0'));
    this.rest$ = timer(0, 500).pipe(map(t => moment().format('mm A')));
  }
}

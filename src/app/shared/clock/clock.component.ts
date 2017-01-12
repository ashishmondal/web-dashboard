import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import 'rxjs';

@Component({
  selector: 'db-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockComponent implements OnInit {

  hour: string;
  colon: string;
  rest: string;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    Observable.timer(0, 500)
      .subscribe(t => {
        const time = moment();
        this.hour = moment().format('h');
        this.colon = t & 1 ? ':' : ' ';
        this.rest = moment().format('mm A');
        this.cdRef.markForCheck();
      });
  }
}

import { Injectable } from '@angular/core';
import { bindCallback } from 'rxjs/observable/bindCallback';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class LocationService {

  public location$: Observable<Position>;

  constructor() {
    this.location$ = Observable.create((subscriber: Subscriber<Position>) => {
      navigator.geolocation.getCurrentPosition(p => {
        subscriber.next(p);
        subscriber.complete();
      }, e => subscriber.error(e));
    }).pipe(shareReplay());
  }
}


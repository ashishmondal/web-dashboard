import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { timer } from 'rxjs/observable/timer';
import { flatMap, map, distinct } from 'rxjs/operators';

@Injectable()
export class BackgroundImageService {
  private readonly url = 'https://3db9wqhyy7.execute-api.us-east-1.amazonaws.com/alpha/bing-image-of-the-day';

  constructor(private http: Http) { }

  getBackgroundImageUrl() {
    return timer(0, 1000 * 60 * 60).pipe( // Every hour
      flatMap(() => this.http.get(this.url)),
      map(response => {
        return 'http://bing.com' + response.json().images[0].url as string;
      }),
      distinct());
  }
}

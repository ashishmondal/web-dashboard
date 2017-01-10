import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Injectable()
export class BackgroundImageService {
  private readonly url = 'https://3db9wqhyy7.execute-api.us-east-1.amazonaws.com/alpha/bing-image-of-the-day';

  constructor(private http: Http) { }

  getBackgroundImageUrl() {
    return Observable.timer(0, 1000 * 60 * 60) // Every hour
      .flatMap(() => this.http.get(this.url))
      .map(response => {
        return 'http://bing.com' + response.json().images[0].url as string;
      })
      .distinct();
  }

}

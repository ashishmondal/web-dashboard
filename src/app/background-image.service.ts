import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BackgroundImageService {

  constructor(private http: Http) { }

  getBackgroundImageUrl(){
    return this.http.get('https://3db9wqhyy7.execute-api.us-east-1.amazonaws.com/alpha/bing-image-of-the-day')
    .map(response => {
      return 'http://bing.com' + response.json().images[0].url as string;
    })
  }

}

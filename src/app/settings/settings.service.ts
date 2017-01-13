import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

@Injectable()
export class SettingsService {
  private readonly key = 'settings;'

  private settings: ISettings;

  constructor(private http: Http, private lsService: LocalStorageService) {

  }

  getSettings(): Observable<ISettings> {
    return new Observable((s: Subscriber<ISettings>) => {

      if (!this.settings) {
        this.settings = this.lsService.get(this.key) as ISettings;

        if (!this.settings) {
          s.error('Settings not found');
          return;
        }

      }

      s.next(this.settings);
      s.complete();
    });
  }

  save(settings: ISettings) {
    return this.lsService.set(this.key, settings);
  }


  loadFromWeb(url: string) {
    // Add date time stamp to disable cache
    return this.http.get(url + '?_=' + new Date().getTime()).map(r => {
      return r.json();
    });
  }
}

export interface ISettings {
  calendarUrl: string;
  calendarUrlHeader: string;
  cityId: string;
  owApiKey: string;
}

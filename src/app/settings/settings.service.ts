import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Http } from '@angular/http';

@Injectable()
export class SettingsService {
  private readonly key = 'settings;'

  constructor(private http: Http, private lsService: LocalStorageService) {

  }

  save(settings: ISettings) {
    return this.lsService.set(this.key, settings);
  }

  load(): ISettings {
    return this.lsService.get(this.key) as ISettings;
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

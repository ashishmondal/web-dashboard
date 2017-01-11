import { Component, OnInit } from '@angular/core';
import { BackgroundImageService } from './background-image.service';
import { SettingsService } from './settings/settings.service';

@Component({
  selector: 'db-root',
  providers: [BackgroundImageService, SettingsService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    // disable background image
    // '[style.background-image]': `backgroundUrl ? 'url(' + backgroundUrl + ')': ''`
  }
})
export class AppComponent implements OnInit {
  backgroundUrl: string;

  constructor(private bgImageService: BackgroundImageService) {

  }

  ngOnInit() {
    this.bgImageService.getBackgroundImageUrl()
      .subscribe(url => this.backgroundUrl = url, err => {
        console.error(err);
      });
  }
}

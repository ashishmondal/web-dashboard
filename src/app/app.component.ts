import { Component, OnInit } from '@angular/core';
import { BackgroundImageService } from './background-image.service';

@Component({
  selector: 'db-root',
  providers: [BackgroundImageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '[style.background-image]': `backgroundUrl ? 'url(' + backgroundUrl + ')': ''`
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

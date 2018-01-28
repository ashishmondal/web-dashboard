import { Component, OnInit } from '@angular/core';
import { BackgroundImageService } from './core';

@Component({
  selector: 'db-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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

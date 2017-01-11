import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService } from './settings.service';

@Component({
  selector: 'db-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit {

  @ViewChild('settingsForm') form: NgForm;

  constructor(private settingsService: SettingsService, private router: Router) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.form.setValue(this.settingsService.load());
    }, 0);
  }

  saveSettings(value) {
    this.settingsService.save(value);
    this.router.navigate(['/']);
    return false;
  }

  loadFromWeb(value) {
    this.settingsService.loadFromWeb(value.url)
      .subscribe(s => {
        //this.form.setValue(this.settingsService.load());
        this.saveSettings(s);
      });

    return false;
  }
}

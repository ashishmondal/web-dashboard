import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { SettingsService } from '../settings/settings.service';

import { ScheduleComponent } from './schedule/schedule.component';
import { CalendarService } from './calendar.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [ScheduleComponent],
  providers: [CalendarService, SettingsService],
  declarations: [ScheduleComponent]
})
export class CalendarModule { }

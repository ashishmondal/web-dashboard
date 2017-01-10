import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ScheduleComponent } from './schedule/schedule.component';
import { CalendarService } from './calendar.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [ScheduleComponent],
  providers: [CalendarService],
  declarations: [ScheduleComponent]
})
export class CalendarModule { }

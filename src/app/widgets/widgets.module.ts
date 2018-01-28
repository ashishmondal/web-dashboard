import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockComponent } from './clock/clock.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ClockComponent],
  exports: [ClockComponent]
})
export class WidgetsModule { }

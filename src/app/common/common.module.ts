import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitConverterPipe } from './unit-converter.pipe';
import { ClockComponent } from './clock/clock.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UnitConverterPipe, ClockComponent]
})
export class CommonModule { }

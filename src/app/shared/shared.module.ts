import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitConverterPipe } from './unit-converter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[UnitConverterPipe],
  declarations: [UnitConverterPipe]
})
export class SharedModule { }

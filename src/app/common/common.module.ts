import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { UnitConverterPipe } from './unit-converter.pipe';

@NgModule({
  imports: [
    NgCommonModule
  ],
  declarations: [UnitConverterPipe]
})
export class CommonModule { }

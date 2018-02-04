import { Pipe, PipeTransform } from '@angular/core';
import * as convert from 'convert-units';

@Pipe({
  name: 'unitConverter'
})
export class UnitConverterPipe implements PipeTransform {

  transform(value: number, fromUnit: string, toUnit: string): number {
    return convert(value).from(fromUnit).to(toUnit);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
let convert = require('convert-units');

@Pipe({
  name: 'unitConverter'
})
export class UnitConverterPipe implements PipeTransform {

  transform(value: number, fromUnit: string, toUnit: string): number {
    return convert(value).from(fromUnit).to(toUnit);
  }
}

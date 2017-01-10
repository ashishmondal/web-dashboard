import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitConverter'
})
export class UnitConverterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform(items: any[], attr: string): any {
    return Math.round(items.reduce((item, sum) => item + sum[attr], 0) * 100) / 100;
  }

}

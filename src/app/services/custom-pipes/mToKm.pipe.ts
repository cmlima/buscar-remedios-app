import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mToKm' })
export class MToKmPipe implements PipeTransform {
  transform(n: number | string): string {
    if (typeof n === 'string') n = parseFloat(n);
    return (n / 1000).toFixed(2);
  }
}

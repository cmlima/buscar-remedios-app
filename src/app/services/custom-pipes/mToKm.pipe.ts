import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mToKm' })
export class MToKmPipe implements PipeTransform {
  transform(n: number): string {
    return (n / 1000).toFixed(2);
  }
}

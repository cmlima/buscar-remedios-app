import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'namecase' })
export class NameCasePipe implements PipeTransform {
  transform(str: string): string {
    return str.split(/\s+/).map(part => {
      if (/^(e|d[aeiou])$/.test(part.toLowerCase())) {
        return part.toLowerCase();
      }
      return part.substr(0,1).toUpperCase() + part.substr(1).toLowerCase();
    })
    .join(' ');
  }
}

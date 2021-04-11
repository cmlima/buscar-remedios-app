import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sentencecase' })
export class SentenceCasePipe implements PipeTransform {
  transform(str: string): string {
    return str.substr(0,1).toUpperCase() + str.substr(1).toLowerCase();
  }
}

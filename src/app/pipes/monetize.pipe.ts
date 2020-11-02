import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monetize',
})
export class MonetizePipe implements PipeTransform {
  transform(value: number): string {
    return `S/ ${value}`;
  }
}
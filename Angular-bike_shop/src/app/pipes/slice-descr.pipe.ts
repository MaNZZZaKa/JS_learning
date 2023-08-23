import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceDescr',
})
export class SliceDescrPipe implements PipeTransform {
  transform(value: string | undefined, ...args: number[]): string {
    const [characters] = args;
    return `${value && value.slice(0, characters + 1)}...`;
  }
}

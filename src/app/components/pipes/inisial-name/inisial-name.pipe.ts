import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inisialName'
})
export class InisialNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

// cnpj and cpf pipe

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduceLength',
  standalone: true,
})
export class ReduceLength implements PipeTransform {
  transform(value: string, length = 20): string {
    if (value.length > length) {
      return value.slice(0, length) + '...';
    }
    return value;

  }
}

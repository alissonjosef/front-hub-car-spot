// cnpj and cpf pipe

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpjCpf',
  standalone: true,
})
export class CnpjCpfPipe implements PipeTransform {
  transform(value: string | null | undefined): string {

    if (!value) {
        return '';
    }

    const newValue = value.trim();

    if (newValue.length === 11) {
      return newValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (newValue.length === 14) {
      return newValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return newValue;
  }
}

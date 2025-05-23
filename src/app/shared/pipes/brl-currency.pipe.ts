import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brlCurrency',
  standalone: true
})
export class BrlCurrencyPipe implements PipeTransform {

    transform(value: number, ...args: unknown[]): unknown {
        if (!value) {
          return 'R$ 0,00';
        }

        const formattedValue = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2, // Definido corretamente com o máximo
          maximumFractionDigits: 2,
        }).format(value);

        return formattedValue;
      }


}

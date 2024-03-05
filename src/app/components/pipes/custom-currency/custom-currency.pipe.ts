import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number | null): string {
    if (isNaN(value!)) return ''; // Return empty string for non-numeric values

    // Format the number with desired separators and currency symbol
    const [wholePart, decimalPart] = value!.toFixed(2).split('.');
    const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Add dots for thousands
    return `Rp. ${formattedWholePart},${decimalPart}`;
  }
}

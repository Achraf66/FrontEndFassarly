import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(value: any, format: string = 'mediumDate', timezone: string, locale: string): any {
    const datePipe = new DatePipe(locale);
    const formattedDate = datePipe.transform(value, format, timezone, locale);

    if (formattedDate) {
      const parts = formattedDate.split(' ');
      if (parts.length === 3) {
        // Swap day and month
        [parts[0], parts[1]] = [parts[1], parts[0]];
      }
      return parts.join(' ');
    }

    return formattedDate;
  }
}

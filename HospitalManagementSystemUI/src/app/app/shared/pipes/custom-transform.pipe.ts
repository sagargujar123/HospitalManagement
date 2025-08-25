import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTransform',
  standalone: true
})
export class CustomTransformPipe implements PipeTransform {

  transform(value: any, type?: string): any {
    if (!value) return value;

    switch (type) {
      case 'age': {
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      }

      case 'dateAge': {
        const birthDate = new Date(value);
        const today = new Date();

        // calculate age
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        // format date as "16 Dec 1998"
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = birthDate.toLocaleDateString('en-GB', options);

        return `${formattedDate} (Age: ${age})`;
      }

      case 'dateTime': {
        const date = new Date(value);
        const formatted = date.toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        return formatted.replace(',', ',\u00A0\u00A0\u00A0');
      }

      case 'uppercase':
        return value.toString().toUpperCase();

      case 'lowercase':
        return value.toString().toLowerCase();

      default:
        return value; // return unchanged if type not matched
    }
  }

}

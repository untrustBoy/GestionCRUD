import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(texto: string, longitudMaxima: number = 20): string {
    if (!texto) {
      return '';
    }

    if (texto.length <= longitudMaxima) {
      return texto;
    } else {
      return texto.substring(0, longitudMaxima) + ' ...';
    }
  }

}

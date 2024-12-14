import { Pipe, PipeTransform } from '@angular/core';
import { PluralService } from '../services/plural.service';

@Pipe({
  name: 'plural'
})
export class PluralPipe implements PipeTransform {
  constructor(private pluralService: PluralService) {}

  transform(value: string): string {
    return this.pluralService.pluralize(value);
  }
}
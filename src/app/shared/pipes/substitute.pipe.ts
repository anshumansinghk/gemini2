import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../../core';
import Utils from '../../core/utils';

interface SubstituteData {
  substitute_class: string; 
  [key: string]: any; 
}

@Pipe({
  name: 'substitute',
  pure: false
})

export class SubstitutePipe implements PipeTransform {
  private latestValue: SubstituteData | null = null;

  constructor(private authService: AuthService) {
    this.authService.substitute.subscribe((value: SubstituteData) => {
      this.latestValue = value;
    });
  }

  transform(key: string): any {
    if (!this.latestValue) {
      return null; 
    }
    if (Utils.isempty(key)) {
      return this.latestValue;
    }
    return this.latestValue[key] ?? null; 
  }
}
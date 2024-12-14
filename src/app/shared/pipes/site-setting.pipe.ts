import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../../core';
import Utils from '../../core/utils';

@Pipe({
  name: 'siteData',
  pure: false
})

export class SiteSettingPipe implements PipeTransform {
  private latestValue: any;

  constructor(private authService: AuthService) {
    this.authService.getSiteData.subscribe((value:any) => {
      this.latestValue = value;
    });
  }

  transform(key: string): any {
    if (!this.latestValue || Utils.isempty(key)) {
      return null; 
    }

    return this.latestValue[key] ?? null; 
  }
}
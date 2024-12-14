/**************************************************************************
*  Revision History:
**************************************************************************/



import { Injectable } from '@angular/core';
import * as currencyFormatter from 'currency-formatter';
import { TranslateService } from '@ngx-translate/core';

@Injectable( {
    providedIn: 'root'
})
export class CurrencyUtils{

    constructor( private translateService: TranslateService ) { }

    format(value: any): string {

        let formatted = currencyFormatter.format(value, { locale: this.translateService.getBrowserCultureLang(), format: "%v"} );
        return formatted;
    }

    formatDecimal(value: any,decimalPlaces: number): string {
        let formatted = currencyFormatter.format(value, { locale: this.translateService.getBrowserCultureLang(), format: "%v", precision: parseInt(decimalPlaces.toString())  });
        return formatted;
    }

    parse(value: string): number {
        let parsed = currencyFormatter.unformat(value, { locale: this.translateService.getBrowserCultureLang(), format: "%v" });
        return parsed;
    }

    round(value:any, places:number)
    {
        return (+(Math.round(+(value + 'e' + places)) + 'e' + -places)).toFixed(places);
    }
}

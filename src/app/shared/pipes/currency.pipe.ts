/**************************************************************************
 *  Revision History:
 *
 **************************************************************************/

import { Pipe, PipeTransform } from "@angular/core";
import { CurrencyUtils } from '../services/currency-utils.service';

@Pipe({
    name: "ssCurrency",
})
export class SsCurrencyPipe implements PipeTransform {
    constructor(private currencyUtils: CurrencyUtils) {}

    transform(value: any, offset: number = 0): string {
        if (value == null) value = "";
        if(offset > 0){
            value = this.currencyUtils.formatDecimal(value, offset);
        } else{
            value =  this.currencyUtils.format(value);
        }

        return value;
    }
}

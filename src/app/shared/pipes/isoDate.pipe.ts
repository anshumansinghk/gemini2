/**************************************************************************
 * comment by developer
*  Revision History:
*
**************************************************************************/


import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'isoDate'
})
export class IsoDatePipe implements PipeTransform {

    constructor(private datePipe: DatePipe) { }

    transform(value: string): string
    {
        var format: string = "dd-mm-yyyy";
        if (value == null)
        {
            return "";
        }
        value = value.replace(/z$/i,"")
        // return this.datePipe.transform(value, format);
        return value;
    }


}

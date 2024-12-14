/**************************************************************************
 *  Revision History:
 *
 **************************************************************************/

import { Pipe, PipeTransform } from "@angular/core";
import { formatDate } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
    name: "shortDateTime",
})
export class ShortDateTimePipe implements PipeTransform {
    constructor(private translateService: TranslateService) { }

    transform(value: string): string {
        if (value == null) value = "";

        //if (value.toLowerCase().indexOf("t00:00:00") > -1) {
        //    value = value.replace(/z$/i, "");
        //}

        var language: string = 'en-US';

        
        return value == "" || value == null
            ? ""
            : new Date(value).toLocaleString(language,{
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
    }
}
/**************************************************************************
 *  Revision History:
 *
 **************************************************************************/

import { Pipe, PipeTransform } from "@angular/core";
import { formatDate } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";

@Pipe({
    name: "durationUTC",
})
export class DurationUTCPipe implements PipeTransform {
    constructor(private translateService: TranslateService) {}

    transform(value: string): string {

        if (value == null) value = "";

        let now = moment.utc(new Date()); //todays date
        let end = moment.utc(value); // another date
        let duration = moment.duration(now.diff(end));
        let minutes = duration.minutes();
        let hours = duration.hours();
        let days = duration.days();

        if(days >= 1 && days<=7 ) {
          return moment(end).format('dddd') +
              ' @ ' +
              moment(end).format('h:mm A');
        }else if (days < 1 && hours >= 1 && hours < 24) {
          return (hours) + " hours ago";
        }else if (hours < 1 && minutes >= 1 && minutes <= 60 ) {
          return (minutes)+ " min ago";
        }else if (minutes == 0 || minutes < 1) {
          return "Posted Just Now";
        } else {
          return moment(end).format('MMM  d, yyyy');
        }
         
    }
}

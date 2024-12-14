/**************************************************************************
*  Revision History:
**************************************************************************/

import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable( {
    providedIn: 'root'
})
export class DateUtils{

    constructor() { }

    now(): moment.Moment {
        return this.getDateAsMoment( new Date() );
    }

    getDateStrAsMoment( dateStr: string ): moment.Moment {
        return this.getDateAsMoment( new Date( dateStr ) );
    }

    getDateAsMoment( date: Date ): moment.Moment {
        return moment( date, 'lll' )
    }

    formatDateToISOString(date: Date){
        let dateString = this.getUTCDateToLocalDate(date.toUTCString());
        dateString = dateString.split('T')[0] + 'T00:00:00'
        return dateString;
    }

    formatDateStringToReadableString(dateString: string){
        let date = new Date(dateString);
        return moment(date).format('MM/D/YY HH:MM A');
    }

    getUTCDateToLocalDate(dateString: string){
        return moment.utc(dateString).local().format();
    }

    stripOffsetTimestampOff(dateString: string){
        return dateString.split('T')[0] + 'T00:00:00';
    }

    padNumber(val: number): string {
        if (val < 10) {
            return "0" + val.toString()
        }
        return val.toString()
    }

    stripTimeOffset(value: Date){
        return value.getFullYear() + '-' + this.padNumber(value.getMonth() + 1) + '-' + this.padNumber(value.getDate()) + 'T00:00:00';
    }

    justDate(input: Date) {

        var dateStr = JSON.stringify(input);

        dateStr = dateStr.replace('"', '');
        dateStr = dateStr.replace('"', '');

        dateStr = this.stripOffsetTimestampOff(dateStr);

        var inDate = new Date(dateStr);

        var retDate = new Date(inDate.getFullYear(), inDate.getMonth(), inDate.getDate());

        return retDate;

    }


    datesAreEqual(dateA: Date, dateB: Date) {

        return ((dateA.getDate() == dateB.getDate())
            && (dateA.getMonth() == dateB.getMonth())
            && (dateA.getFullYear() == dateB.getFullYear())
        );


    }

}

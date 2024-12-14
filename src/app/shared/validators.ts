/**************************************************************************
*  Object Name: validators.ts
* 
**************************************************************************/

import { AbstractControl, ValidatorFn, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';

export class SeValidators {

    static number( c: AbstractControl ): { [key: string]: boolean } | null {
        if ( c.value && ( isNaN( c.value ) ) ) {
            return {
                'number': true
            };
        }
        return null;
    }

    static beginEndDates(g: UntypedFormGroup): { [key: string]: boolean } | null {

        var invalid: boolean = false;
        var errResult: { [key: string]: boolean };

        var dateBegin: string = (g.get('dateBegin') as any).value;
        var dateEnd: string = (g.get('dateEnd')as any).value;

        if ((dateBegin == '') || (dateBegin == null)) {
            errResult = {
                'begin-date-invalid': true
            };
            return errResult;
        } else {
            var beginDate: Date;
            var endDate: Date;

            try {
                beginDate = new Date(dateBegin);
            }
            catch {
                errResult = {
                    'begin-date-invalid': true
                };
                return errResult;
            }
            if ((dateEnd !== '') && (dateEnd !== null)) {
                try {
                    endDate = new Date(dateEnd);
                }
                catch {
                    errResult = {
                        'end-date-invalid': true
                    };
                    return errResult;
                }

                if (beginDate > endDate) {
                    errResult = {
                        'begin-end-date': true
                    };
                    return errResult;
                }
            }
        }

        return null;
    }


    static iban(c: AbstractControl): { [key: string]: boolean } | null {


        var errResult: { [key: string]: boolean };

        errResult = {
            'iban': true
        };

        var ibanNumber: string = c.value;

        if ((ibanNumber == null) || (ibanNumber == ''))
            return null;

        ibanNumber = ibanNumber.split(' ').join('');
        ibanNumber = ibanNumber.toUpperCase();


        var country: string = ibanNumber.substring(0, 2);

        var objDict: { [key: string]: number } = {

            'AD': 24,
            'AE': 23,
            'AL': 28,
            'AT': 20,
            'AZ': 28,
            'BA': 20,
            'BE': 16,
            'BG': 22,
            'BH': 22,
            'CH': 21,
            'CR': 21,
            'CY': 28,
            'CZ': 24,
            'DE': 22,
            'DK': 18,
            'DO': 28,
            'EE': 20,
            'ES': 24,
            'FI': 18,
            'FO': 18,
            'FR': 27,
            'GB': 22,
            'GE': 22,
            'GI': 23,
            'GL': 18,
            'GR': 27,
            'HR': 21,
            'HU': 28,
            'IE': 22,
            'IL': 23,
            'IS': 26,
            'IT': 27,
            'KW': 30,
            'KZ': 20,
            'LB': 28,
            'LI': 21,
            'LT': 20,
            'LU': 20,
            'LV': 21,
            'MC': 27,
            'MD': 24,
            'ME': 22,
            'MK': 19,
            'MR': 27,
            'MT': 31,
            'MU': 30,
            'NL': 18,
            'NO': 15,
            'PL': 28,
            'PT': 25,
            'RO': 24,
            'RS': 22,
            'SA': 24,
            'SE': 24,
            'SI': 19,
            'SK': 24,
            'SM': 27,
            'TN': 24,
            'TR': 26,
            'VG': 24
        }




        var countryLen: number = -1;

        try {

            countryLen = objDict[country];

        }
        catch (e) {

            countryLen = -1;
        }

        if (countryLen == null)
            countryLen = -1;



        if (ibanNumber.length != countryLen) {
            return errResult;
        }


        if (!ibanNumber.match(/^[A-Z0-9]*$/))
            return errResult;


        var bank: string = ibanNumber.substr(4, ibanNumber.length - 4) + ibanNumber.substr(0, 4);
        var asciiShift: number = 55;

        var sb: string = '';
        var v: number = 0;

        for (let c of bank) {

            if (c.match(/^[A-Z]*$/))

                v = c.charCodeAt(0) - asciiShift;

            else
                v = parseInt(c);

            sb += v.toString();
        }

        var checkSumString: string = sb.toString();

        var checksum: number = parseInt(checkSumString.substr(0, 1));

        for (var i = 1; i < checkSumString.length; i++)
        {
            v = parseInt(checkSumString.substr(i, 1));

            checksum *= 10;
            checksum += v;
            checksum %= 97;
        }


        if (checksum != 1)
            return errResult;



        return null;

    }


    static ibanPrefix(prefix: string): ValidatorFn {

        return (fieldControl: AbstractControl): { [key: string]: any } | any  => {


            var errResult: { [key: string]: any };

            errResult = {
                'ibanPrefix': { configuredPrefix: prefix}
            };

            if (prefix != "") {

                var ibanNumber: string = fieldControl.value;

                if ((ibanNumber == null) || (ibanNumber == ''))
                    return null;

                ibanNumber = ibanNumber.split(' ').join('');
                ibanNumber = ibanNumber.toUpperCase();


                var country: string = ibanNumber.substring(0, prefix.length);


                if (country != prefix) {
                    return errResult;
                }

            }

        }
    }




    static routingABA(c: AbstractControl): { [key: string]: boolean } | null {

        if (!c.value)
        return null;


        var errResult: { [key: string]: boolean };
        var abaNumber: string = c.value;

        errResult = {
            'routing-aba': true
        };

        if (isNaN(c.value))
            return errResult;

        var i: number;
        var result: number;


        var int_tmp: number = 0;
        var int_tmp2: number = 0;

        if ((abaNumber.length != 9)) {
            return errResult;
        }


        if ((abaNumber.substring(0, 1) == "-")) {
            return errResult;
        }

        for (i = 1; (i <= abaNumber.length); i++) {
            switch (i) {
                case 1:
                case 4:
                case 7:
                    int_tmp2 = parseInt(abaNumber.substring((i - 1), i));
                    int_tmp = int_tmp + (3 * int_tmp2);
                    break;
                case 2:
                case 5:
                case 8:
                    int_tmp2 = parseInt(abaNumber.substring((i - 1), i));
                    int_tmp = int_tmp + (7 * int_tmp2);
                    break;
                case 3:
                case 6:
                case 9:
                    int_tmp2 = parseInt(abaNumber.substring((i - 1), i));
                    int_tmp = int_tmp + int_tmp2;
                    break;
            }
        }


        if (((int_tmp % 10)
            == 0)) {
            return null;
        }
        else {
            return errResult;
        }

    }

    static sortCode(c: AbstractControl): { [key: string]: boolean } | null {

    /* need to write validator for sortCode
        if (c.value && (isNaN(c.value))) {
            return {
                'sort-code': true
            };
        }
        */
        return null;

    }

    static sortSwiftCode(c: AbstractControl): { [key: string]: boolean } | null {

        if (!c.value)
            return null;

        var errResult: { [key: string]: boolean } = {
            'swift-code': true
        };

        if (c.value && (isNaN(c.value))) {
            return errResult;
        }

        if (c.value.toString().length == 8 || c.value.toString().length == 11)
            return null
        else
            return errResult

    }

    static minimumNumericValidator(input: AbstractControl): { [key: string]: boolean } | null {

        if (input.value <= 0)
            return { "greater-than-zero": true };

        return null;
    }


    // ValidatorFn
    static conditionalRequired(condition: boolean): ValidatorFn {
        return (control: AbstractControl): { [s: string]: boolean } | null => {

            let required: boolean = condition;
            if (required && !control.value) {
                return { required: true };
            } else{

            }
            return null;
        }
    }

    static cannotContainSpace() : ValidatorFn {
        return (control: AbstractControl): { [s: string]: boolean } | null =>{
            if((control.value as string).length > 0 && ((control.value as string).trim()).length === 0){
                return {cannotContainSpace: true}
            }

            return null;
        }
    }

    static minDate(date: string, fieldType?: string, label?:string, useCustomeLabel:boolean = false): ValidatorFn{
        return (control:AbstractControl) =>{
            let controlValue = new Date(control.value ?? '');
            let minValue = new Date(date ?? '');

            if (controlValue.getTime() < minValue.getTime()) {
                if (fieldType && fieldType !== null) {
                    if(useCustomeLabel){
                        return {minDateWithCustomLabel: { startDateLabel: label}}
                    } else{
                        return {[fieldType]: true}
                    }
                }
                if(useCustomeLabel){
                    return {minDateWithCustomLabel: { startDateLabel: label}}
                } else{
                    return {minDate: true}
                }
            }
            return null;
        }
    }

    static maxDate(date: string,fieldType?:string, label?:string, useCustomeLabel:boolean = false): ValidatorFn{
        return (control:AbstractControl) =>{
            let controlValue = new Date(control.value ?? '');
            let minValue = new Date(date ?? '');

            if (controlValue.getTime() > minValue.getTime()) {
                if (fieldType && fieldType !== null) {
                    if(useCustomeLabel){
                        return {maxDateWithCustomLabel: { endDateLabel: label}}
                    }
                    return { [fieldType]: true }
                }
                if(useCustomeLabel){
                    return {maxDateWithCustomLabel: { endDateLabel: label}}
                } else{
                    return {maxDate: true}
                }
            }
            return null;
        }
    }


    // from date should be less than to date
    static fromMaxDate(from: string, to: string,fieldType?:string, label?:string, useCustomeLabel:boolean = false): ValidatorFn {
        return (group: any): {[key: string]: any} => {
          let f = group.controls[from].value;
          let t = group.controls[to].value;

          let fValue = new Date(f ?? '');
          let tValue = new Date(t ?? '')
          if (fValue.getTime() > tValue.getTime()) {
            if (fieldType && fieldType !== null) {
                if(useCustomeLabel){
                    return {maxDateWithCustomLabel: { endDateLabel: label}}
                }
                return { [fieldType]: true }
            }
            if(useCustomeLabel){
                return {maxDateWithCustomLabel: { endDateLabel: label}}
            } else{
                return {maxDate: true}
            }
          }
          return {};
        }
    }

    static minAmount(amount: any): ValidatorFn{
        return (control:AbstractControl) =>{
            let controlValue = control.value ?? 0;
            let minValue = amount;

            if ( +controlValue < +minValue) {
                return { "less-than-min": true };
            }
            return null;
        }
    }

    static maxAmount(amount: any): ValidatorFn{
        return (control:AbstractControl) =>{
            let controlValue = control.value ?? 0;
            let maxValue = amount;

            if (+controlValue !== 0 && +maxValue != 0 && +controlValue >= +maxValue) {
                return { "greater-than-max": true };
            }
            return null;
        }
    }


}

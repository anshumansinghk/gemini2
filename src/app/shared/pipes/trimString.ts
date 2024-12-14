/**************************************************************************
*  Revision History:
*
**************************************************************************/


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimStringPipe implements PipeTransform {

    transform(value: string): string
    {
        if (value == null)
        {
            return "";
        }
        value = value.trim();
        return value;
    }


}

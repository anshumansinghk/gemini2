/**************************************************************************
*  Object Name: helper.service.ts
**************************************************************************/

import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HelperService{
    constructor(  ) { }

    public isEmpty(value:any)
    {
        return (value === undefined ||
        value === null ||
        (value || []).length === 0 ||
        Object.keys(value || {}).length === 0);
    }

}

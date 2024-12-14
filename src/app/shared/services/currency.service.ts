/**************************************************************************
*  Revision History:
**************************************************************************/

import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { ApiService } from './../../core/index';
import { Code } from './../../core/models/code';
import { ExchangeRateResponse, ExchangeRateQuery} from './../../core/models/ExchangeRateModels';
import { DDLBOptionString } from '../../shared/models/ddlb-option';



@Injectable( {
    providedIn: 'root'
} )
export class CurrencyService{

    constructor( private apiService: ApiService ) { }

    getSystemCurrencyCodes(): Observable<DDLBOptionString[]> {
        return this.apiService.get<DDLBOptionString[]>( `currencies/system-codes` );
    }

    getExchangeRate(searchParams: ExchangeRateQuery): Observable<ExchangeRateResponse> {
        return this.apiService.get<ExchangeRateResponse>('currencies/rates', searchParams);
    }
}

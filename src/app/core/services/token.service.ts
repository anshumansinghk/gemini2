/**************************************************************************
*  Revision History:
*  
**************************************************************************/

import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { AppConfig } from '../app.config';
import { DateUtils } from './../../shared/services/date-utils.service';

@Injectable({
    providedIn: 'root',
})
export class TokenService {

  expireDate!: any;
  localData!: any;

    keys = {
        token: 'token',
        tokenExpiration: 'Token-exp', //in minute
        role:'role'
    };

    constructor(private appConfig: AppConfig, private dateUtils: DateUtils) { }

    getToken(): string {
      this.localData = localStorage.getItem( this.keys.token );
        return this.localData;
    }

    getTokenExpireDate(): moment.Moment {
        this.expireDate = localStorage.getItem( this.keys.tokenExpiration );
        return this.dateUtils.getDateStrAsMoment( this.expireDate );
    }

    setToken( token: string ): void {
        this.setTokenImp(token, this.appConfig.config.sessionTimeOut)
    }

    setTokenImp(token: string,minutes:number): void {
        var now = this.dateUtils.now();
        var expiration = moment(now).add(minutes, "minutes");
        localStorage.setItem(this.keys.token, token);
        localStorage.setItem(this.keys.tokenExpiration, expiration.toLocaleString());
        
    }

    deleteToken(): void {
        localStorage.removeItem( this.keys.token );
        localStorage.removeItem( this.keys.tokenExpiration );
    }

    isTokenExpired(): boolean {
        var expiration = localStorage.getItem( this.keys.tokenExpiration );

        if ( expiration == null ) return true;

        var now = this.dateUtils.now();
        var expires = this.dateUtils.getDateStrAsMoment( expiration );
        // return !!now.isAfter( expires );
        return !!now.isAfter( expires );
    }

    isLogin(): boolean {
        var expirationLogin = localStorage.getItem( this.keys.token );
       
        if ( expirationLogin != null && expirationLogin != undefined && expirationLogin != 'null' && expirationLogin != 'undefined' && expirationLogin != '')
        { 
         return true;
        }
         else
         { 
         return false;
        }
        
    }

    getRole(): string {
        this.localData = localStorage.getItem( this.keys.role );
        return this.localData;
    }

}

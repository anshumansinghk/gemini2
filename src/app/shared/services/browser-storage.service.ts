/**************************************************************************
*  Object Name: browser-storage.service.ts
**************************************************************************/

import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import * as moment from 'moment';


@Injectable( {
    providedIn: 'root'
} )
export class BrowserStorage{
  public item!:any;

    constructor(  ) { }

    set(key: string, value: string, expireMinutes: number, useLocal:boolean)
    {
        this.expireItems();

        this.setItem("SETMP*" + key, value, useLocal);
        if (expireMinutes == 0) { expireMinutes = 20 }

        var dt = moment(new Date).add(expireMinutes, 'm').toDate();
        this.setItem("SETMP*" + key + "*EXPDT", dt.getTime().toString(),useLocal)
    }

    get(key: string): string {
        this.expireItems();
        this.item = sessionStorage.getItem("SETMP*" + key);
        if (this.item == null) { this.item = localStorage.getItem("SETMP*" + key) }
        return  this.item;
    }

    private getKeys(storage:any): any
    {
        var keys = new Array();
        for (var i = 0, len = storage.length; i < len; ++i) {
            var key: string = storage.key(i);
            if (key.length > 6)
            {
                if (key.substring(0, 6) == "SETMP*")
                {
                    if (key.substring(key.length - 6) != "*EXPDT")
                    {
                        keys[keys.length] = key;
                    }
                }
            }
        }
        return keys;
    }



    private expireItems()
    {
        this.expireStorage(localStorage);
        this.expireStorage(sessionStorage);
    }

    private expireStorage(storage: any)
    {
        var timestamp: number = (new Date).getTime();
        var removes = new Array();
        var keys = this.getKeys(storage);


        for (var i = 0; i < keys.length; ++i) {
            var key: string = keys[i];

            //if there's no expiration key, then remove (EVERYTHING should expire)
            if (storage.getItem(key + "*EXPDT") == null)
            {
                storage.removeItem(key);
            }
            else
            {
                var exp = storage.getItem(key + "*EXPDT");

                if (timestamp > parseInt(exp)) {
                    storage.removeItem(key + "*EXPDT");
                    storage.removeItem(key);
                }
                else
                {
                }
            }
        }

    }


    private setItem(key: string, value: string,useLocal:boolean)
    {
        if (useLocal == true){
            localStorage.setItem(key, value);
        }
        else {
            sessionStorage.setItem(key, value);
        }
    }

    private clearStorage(storage: any)
    {
        var keys = this.getKeys(storage);

        for (var i = 0; i < keys.length; ++i) {
            var key: string = keys[i];
            if (storage.getItem(key + "*EXPDT") != null)
            {
                storage.removeItem(key + "*EXPDT");
            }
            storage.removeItem(key);
        }
    }


    clear()
    {
        this.clearStorage(sessionStorage);
        this.clearStorage(localStorage);
    }

}

/**************************************************************************
*  Object Name: console.service.ts
**************************************************************************/

import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AppConfig } from "../../core/app.config";
// import * as ESAPI from 'node-esapi';

@Injectable( {
    providedIn: 'root'
} )
export class ConsoleInterface{
    private isDebugMode: boolean;

    constructor(private appConfig: AppConfig) {
        this.isDebugMode = this.appConfig.config.isDebugMode;
    }

    public Write(message: any,evenInProd?: boolean)
    {
        if (this.isDebugMode == true || evenInProd == true) {
            // console.log(this.ProcessMessage(message));
        }
    }

    public Info(message: any, evenInProd?: boolean) {
        if (this.isDebugMode == true || evenInProd == true) {
            console.info(this.ProcessMessage(message));
        }
    }

    public Warn(message: any, evenInProd?: boolean) {
        if (this.isDebugMode == true || evenInProd == true) {
            console.warn(this.ProcessMessage(message));
        }
    }

    public Error(message: any, evenInProd?: boolean) {
        if (this.isDebugMode == true || evenInProd == true) {
            console.error(this.ProcessMessage(message));
        }
    }


    private ProcessMessage(msg: any): any {
        if (typeof msg === "string") {
          //comment by developer
            // msg = ESAPI.encoder().encodeForHTML(msg)
            msg = msg.replace(/&#x3a;/gi, ":")
       }

        return msg;
    }

}

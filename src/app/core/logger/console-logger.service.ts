// https://robferguson.org/blog/2017/09/09/a-simple-logging-service-for-angular-4/
import { Injectable } from '@angular/core';
import { AppConfig } from './../app.config';

import { Logger } from './logger.service';

const noop = (): any => undefined;

@Injectable()
export class ConsoleLoggerService implements Logger {

    private isDebugMode: boolean;

    constructor( private appConfig: AppConfig ) {
        this.isDebugMode = this.appConfig.config.isDebugMode;
    }

    get info() {
        if ( this.isDebugMode ) {
            return console.info.bind( console );
        } else {
            return noop;
        }
    }

    get warn() {
        if ( this.isDebugMode ) {
            return console.warn.bind( console );
        } else {
            return noop;
        }
    }

    get error() {
        if ( this.isDebugMode ) {
            return console.error.bind( console );
        } else {
            return noop;
        }
    }

    /*
        invokeConsoleMethod() allows you to invoke a console method (e.g., console.info())
        which will result in an incorrect source file name and line number. If you use the
        bind() method (as per the ConsoleLoggerService) you will log the correct source
        file name and line number.
    */
    invokeConsoleMethod( type: string, args?: any ): void {
        const logFn: Function = ( console )[type] || // console.log || noop;
        logFn.apply( console, [args] );
    }
}

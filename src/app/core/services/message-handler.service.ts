/**************************************************************************
*  Revision History:
*
**************************************************************************/


import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";
import { AppConfig } from "./../app.config";
import { Config } from "./../models/index";

@Injectable({
    providedIn: 'root',
})
export class MessageHandlerService{
    @Output() controlGoEvent = new EventEmitter<any>();
    @Output() mechanicSaveEvent = new EventEmitter<any>();
    @Output() addNewEvent = new EventEmitter<any>();
    @Output() uploadDocEvent = new EventEmitter<any>();
    @Output() openProgramPaymentEvent = new EventEmitter<any>();
    @Output() openDModeEvent = new EventEmitter<any>();

    private window: Window = window;
    private document: Document = document;
    private config: Config;

    private inMessages: { [s: string]: string; } = {
        initialized: 'initialized',
        authentication: 'authentication',
        changePath: 'changePath',
        logout: 'logout',
        controlGo: 'controlGo',
        mechanicSave: 'mechanicSave',
        addNew: 'addNew',
        uploadDoc: 'uploadDoc',
        openProgramPayment: 'openProgramPayment',
        openDMode: 'openDMode'
    }

    private outMessages: { [s: string]: string; } = {
        initializedSuccess: 'initializedSuccess',
        authenticationSuccess: 'authenticationSuccess',
        authenticationError: 'authenticationError',
        changePathSuccess: 'changePathSuccess',
        changePathError: 'changePathError',
        logoutSuccess: 'logoutSuccess'
    }

    constructor(
        private authService: AuthService,
        private tokenService: TokenService,
        private appConfig: AppConfig,
        private router: Router
    ) {
        this.config = appConfig.config;
    }

    init() {
        this.receiveMessage();
    }

    private receiveMessage() {
        // if ( this.document.domain )
        //     this.document.domain = this.config.domainReference;

        this.window.onmessage = this.onMessage.bind(this);
    }

    private onMessage( e:any ) {

        var data;
        try {
            data = JSON.parse( e.data );
        }
        catch (err) { };

        if ( data ) {

            switch ( data.messageType ) {
                case this.config.messagePrefix + this.inMessages.controlGo:
                    this.controlGoEvent.emit();
                    break;
                case this.config.messagePrefix + this.inMessages.mechanicSave:
                    this.mechanicSaveEvent.emit();
                    break;
                case this.config.messagePrefix + this.inMessages.addNew:
                    this.addNewEvent.emit();
                    break;
                case this.config.messagePrefix + this.inMessages.uploadDoc:
                    this.uploadDocEvent.emit();
                    break;
                case this.config.messagePrefix + this.inMessages.openProgramPayment:
                    this.openProgramPaymentEvent.emit(data.kf_return);
                    break;
                case this.config.messagePrefix + this.inMessages.openDMode:
                    this.openDModeEvent.emit();
                    break;
                case this.config.messagePrefix + this.inMessages.initialized:
                    this.sendMessage( this.outMessages.initializedSuccess );
                    break;

                case this.config.messagePrefix + this.inMessages.authentication:
                    var token = data.token || this.tokenService.getToken();

                    if ( token ) {
                        // this.tokenService.setToken( token );
                        this.sendMessage( this.outMessages.authenticationSuccess );
                    } else {
                        this.sendMessage( this.outMessages.authenticationError );
                    }
                    break;

                case this.config.messagePrefix + this.inMessages.changePath:
                    if ( data.path ) {
                        this.changePath( data.path );
                        this.sendMessage( this.outMessages.changePathSuccess )
                    } else {
                        this.sendMessage( this.outMessages.changePathError );
                    }
                    break;
                case this.config.messagePrefix + this.inMessages.logout:
                    this.authService.logout();
                    this.sendMessage( this.outMessages.logoutSuccess );
                    break;

                default:
                    return;
            }
        }
    }

    private changePath( path:string ) {
        this.router.navigateByUrl( path );
    }

    sendMessage( message:string ) {
        this.window.parent.postMessage( this.config.messagePrefix + message, '*' );
    }

}

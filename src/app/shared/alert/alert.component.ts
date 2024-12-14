/**************************************************************************
*  Revision History:
*
**************************************************************************/
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from './alert.service';
import { SubscriptionLike } from '../commonAngular';


@Component( {
    selector: 'ss-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
} )
export class AlertComponent implements OnInit, OnDestroy
{
    alertMessage: any = "";
    alertClass: string = "alert-info";
    alertSpinner: boolean = false;
    hasArray: boolean;
    private alertSubscription: SubscriptionLike;

    constructor(private alertService: AlertService) {
        this.alertSubscription = alertService.messageSet.subscribe((e:any) => {
           // // console.log(e.messageKey);
            this.showAlert(e.messageKey,e.class,e.spinner,e.autoClose,e.hasArray,e.pageLoader)
            
        });
    }
 
    ngOnInit() {}

    ngOnDestroy(): any {
        if (this.alertSubscription) {
            this.alertSubscription.unsubscribe();
        }
    }

    showAlert(message: any, mode: string, spinner: boolean,autoClose:boolean, hasArray:boolean, pageLoader:boolean) {
        this.alertClass = mode;
        this.alertSpinner = spinner
        this.alertMessage = message;
        this.hasArray = hasArray;
        if(pageLoader)
        { 
            window.scroll({ 
                top: 0, 
                left: 0, 
                behavior: 'smooth' 
            });
        }
   
        if (autoClose) {
            setTimeout(() => { this.alertMessage = "" }, 3000)
        }
    }

}

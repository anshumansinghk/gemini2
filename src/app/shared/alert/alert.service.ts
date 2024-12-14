/**************************************************************************
*  Revision History:
*
**************************************************************************/


import { Component, Injectable, Output, EventEmitter } from '@angular/core'


export enum AlertMode {
    Success = <any>"alert-success",
    Info = <any>"alert-info",
    Danger = <any>"alert-danger"
}


@Injectable({
    providedIn: 'root',
})  
export class AlertService { 

  loader: boolean = false;  
  @Output() messageSet = new EventEmitter<object>();
  constructor() {
  }

  showInfo(messageKey: string, spinner: boolean)
  {
      this.messageSet.emit({ messageKey: messageKey, class: AlertMode.Info.valueOf(), spinner: spinner, autoClose: false })

  }
  showError(messageKey: any, autoClose: boolean , pageLoader: boolean, hasArray:boolean)
  {
      this.messageSet.emit( { messageKey: messageKey, class: AlertMode.Danger.valueOf(), spinner: false, autoClose , hasArray:hasArray , pageLoader:pageLoader });
      this.loader = false;
  }

  showSuccess(messageKey: any, autoClose: boolean, pageLoader: boolean, hasArray:boolean)
  {
      this.messageSet.emit({ messageKey: messageKey, class: AlertMode.Success.valueOf(), spinner: false, autoClose: autoClose , hasArray:hasArray , pageLoader:pageLoader  });
      this.loader = false;
  }

  hide()
  {
      this.messageSet.emit({ messageKey: "", class: AlertMode.Success.valueOf(), spinner: false, autoClose: false })
  }

  actionInfoWithSpinner(messageKey: string, spinner: boolean){
      this.showInfo(messageKey, spinner);
  }

} 

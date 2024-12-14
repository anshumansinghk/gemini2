/**************************************************************************
*  Revision History:
*
**************************************************************************/


import { Injectable, Output, EventEmitter, OnDestroy } from '@angular/core'
import { SubscriptionLike as ISubscription } from "rxjs";
import { MessageHandlerService } from "./message-handler.service";
// import { ConsoleInterface } from "../../shared/services/console.service";
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class StackCommService implements  OnDestroy
{
    @Output() controlGoEvent = new EventEmitter<any>();
    @Output() mechanicSaveEvent = new EventEmitter<any>();
    @Output() addNewEvent = new EventEmitter<any>();
    @Output() uploadDocEvent = new EventEmitter<any>();
    @Output() openProgramPaymentEvent = new EventEmitter<any>();
    @Output() openDModeEvent = new EventEmitter<any>();

    private controlGoSubscription: ISubscription;
    private mechanicSaveSubscription: ISubscription;
    private addNewSubscription: ISubscription;
    private uploadDocSubscription: ISubscription;
    private openProgramPaymentSubscription: ISubscription;
    private openDModeSubscription: ISubscription;
    private isDirty: number = -1;
    private deedCounter!: number;

  constructor(private CGE: MessageHandlerService,
      // private seConsole: ConsoleInterface,
      private translateService: TranslateService ) {
      this.controlGoSubscription = CGE.controlGoEvent.subscribe(e => {
          this.controlGoEvent.emit();
      });
      this.mechanicSaveSubscription = CGE.mechanicSaveEvent.subscribe(e => {
          this.mechanicSaveEvent.emit();
      });
      this.addNewSubscription = CGE.addNewEvent.subscribe(e => {
          this.addNewEvent.emit();
      });
      this.uploadDocSubscription = CGE.uploadDocEvent.subscribe(e => {
          this.uploadDocEvent.emit();
      });
      this.openProgramPaymentSubscription = CGE.openProgramPaymentEvent.subscribe(e => {
          this.openProgramPaymentEvent.emit(e);
      });
      this.openDModeSubscription = CGE.openDModeEvent.subscribe(e => {
          this.openDModeEvent.emit();
      });

  }

  dirtyDeed()
  {
      this.deedCounter += 1;
      if (this.deedCounter <= 7) //for a total of 2800ms
      {
          if (this.isDirty == 1)
          {
              window.parent.postMessage(JSON.stringify({ funcName: 'setDirty' }), '*');
          }
          else
          {
              window.parent.postMessage(JSON.stringify({ funcName: 'clearDirty' }), '*');
          }
          setTimeout(() => { this.dirtyDeed() }, (100 * this.deedCounter));
      }
  }


  setDirty() {
      if (this.isDirty == 1) { return;}
      this.isDirty = 1;
      this.deedCounter = 0;
      this.dirtyDeed();
      // this.seConsole.Write("seting dirty");
      window.parent.postMessage(JSON.stringify({ funcName: 'setDirty' }), '*');
 }

  clearDirty() {
      if (this.isDirty == 0) { return; }
      this.isDirty = 0;
      this.deedCounter = 0;
      this.dirtyDeed();
      // this.seConsole.Write("clearing dirty");

      window.parent.postMessage(JSON.stringify({ funcName: 'clearDirty' }), '*');
  }

  ngOnDestroy(): any {
      if (this.controlGoSubscription) {
          this.controlGoSubscription.unsubscribe();
      }
      if (this.addNewSubscription) {
          this.addNewSubscription.unsubscribe();
      }
      if (this.uploadDocSubscription) {
          this.uploadDocSubscription.unsubscribe();
      }
      if (this.openProgramPaymentSubscription) {
          this.openProgramPaymentSubscription.unsubscribe();
      }
      if (this.openDModeSubscription) {
          this.openDModeSubscription.unsubscribe();
      }
  }

  saved() {
        window.parent.postMessage(JSON.stringify({ funcName: 'saved' }), '*');
  }
    mechanicSaved() {
        window.parent.postMessage(JSON.stringify({ funcName: 'mechanic_saved' }), '*');
    }
    mechanicEnableSave() {
        window.parent.postMessage(JSON.stringify({ funcName: 'mechanic_enable_save' }), '*');
    }


  get inFrame(): boolean {
      return (window != parent.window);
  }

  maximizeSpace(spaceNeeded: number) {

      // this.seConsole.Write("Maximize space call: " + spaceNeeded);
      window.parent.postMessage(JSON.stringify({ funcName: 'maximizeSpace', args: [spaceNeeded] }), '*');
  }
  stopWait() {
    window.parent.postMessage(JSON.stringify({ funcName: 'stopWait'}), '*');
}

  notifyLoad() {
      window.parent.postMessage(JSON.stringify({ funcName: 'notifyLoad'}), '*');
      this.clearDirty();
  }

    summaryPane(show: boolean) {
        window.parent.postMessage(JSON.stringify(
            {
                funcName: 'summaryPane',
                show: show
            }), '*');


        setTimeout(() => {
            this.maximizeSpace(1310);
        }, 100);

        setTimeout(() => {
            this.maximizeSpace(1310);
        }, 500);


    }

  showSCP(printOnly: boolean) {
      window.parent.postMessage(JSON.stringify({ funcName: 'showSCP', args: [printOnly] }), '*');
    }

    clearSCP() {
        window.parent.postMessage(JSON.stringify({ funcName: 'clearSCP' }), '*');
    }


  navigateToASPXPage(URL: string) {
      window.parent.postMessage(JSON.stringify({ funcName: 'navigateToASPXPage', args: [URL] }), '*');
  }

    uploadDocument(int_width: number, int_height: number, str_url: string, str_title: string, bln_closebox: boolean, bln_fullscreen: boolean, script_after: string) {
        window.parent.postMessage(JSON.stringify(
            {
                funcName: 'uploadDocument',
                width: int_width,
                height: int_height,
                url: str_url,
                title: str_title,
                closebox: bln_closebox,
                fullscreen: bln_fullscreen,
                script_after: script_after
            }), '*');
    }

    openProgramPayment(str_url: string, ppKeyFields: string) {
        window.parent.postMessage(JSON.stringify({ funcName: 'openProgramPayment', url: str_url, ppKeyFields: ppKeyFields }), '*');
    }

    closeDMode() {
        window.parent.postMessage(JSON.stringify({ funcName: 'closeDMode' }), '*');
    }

    openDMode(int_width: number, int_height: number, str_url: string, str_title: string, bln_closebox: boolean, bln_fullscreen: boolean, script_after: string) {
        this.translateService.get(str_title).subscribe(title => {
            window.parent.postMessage(JSON.stringify(
                {
                    funcName: 'openDMode',
                    width: int_width,
                    height: int_height,
                    url: str_url,
                    title: title,
                    closebox: bln_closebox,
                    fullscreen: bln_fullscreen,
                    script_after: script_after
                }), '*');
        })
    }

}

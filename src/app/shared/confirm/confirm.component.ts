// The service and the component are in the same file beause angular throws an error when they are not.
//  Because of this, we can have ConfirmService and ConfirmConponent reference each other and not
//  have a circular dependency issue.
/**************************************************************************
*  Object Name: confirm.component.ts
**************************************************************************/

import { Injectable, EventEmitter, Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmResponse } from './models/';
import { Observable, Subject } from '../commonAngular';
import { BehaviorSubject, AsyncSubject } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class ConfirmService {
    private onCloseObservable = new Subject<any>();

    private modalRef!: BsModalRef;

    constructor(private modalService: BsModalService) { }

    open(messageKey?: string, confirmText?: string, declineText?: string): Observable<{ success: boolean, data?: object }> {
        this.onCloseObservable = new Subject<any>()
        this.modalRef = this.modalService.show(ConfirmComponent, {
            class: 'modal-sm',
            ignoreBackdropClick: true,
            initialState: {
                messageKey: messageKey,
                confirmText: confirmText,
                declineText: declineText
            }
        });
        return this.onCloseObservable.asObservable();
    }


    public close(data: ConfirmResponse) {
        this.modalRef.hide()
        this.onCloseObservable.next(data);
        this.cleanup();
    }

    private cleanup() {
        (this.modalRef as any )= null;
        this.onCloseObservable.complete();
    }
}


@Component({
    templateUrl: './confirm.component.html'
})
export class ConfirmComponent {
    messageKey: string = 'confirmDeleteItem';
    confirmText: string = 'yes';
    declineText: string = 'no';

    constructor(private confirmService: ConfirmService) {
    }

    confirm(): void {
        this.confirmService.close({ success: true });
    }

    decline(): void {
        this.confirmService.close({ success: false });
    }
}

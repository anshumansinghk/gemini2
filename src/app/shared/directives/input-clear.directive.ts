/**************************************************************************
*  Revision History:
*
**************************************************************************/

import { Component, Input, Output, OnChanges, EventEmitter} from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
    selector: '[se-input-clear]',
    template: `
        <span class="container">
            <ng-content></ng-content><i *ngIf="show" (click)="clearValue()" class="clear fas fa-times" aria-hidden="true"></i>
        </span>
    `,
    styles: [`
        .container{
            position: relative;
        }
        .clear {
            position: absolute;
            z-index: 4;
            top: 8px;
            right: 20px; 
            cursor: pointer;
        }
    `]
} )
export class InputClearDirective implements OnChanges{
    
    @Input( 'ss-input-clear' ) property!: string;
    @Output( "clear" ) clearEvent: EventEmitter<string> = new EventEmitter();
    
    show: boolean = false;

    constructor() { }

    ngOnChanges() {
        this.updateVisibility();
    }
       
    updateVisibility() {
        this.show = !!this.property;
    }

    clearValue() {
        this.clearEvent.emit();
    }



}

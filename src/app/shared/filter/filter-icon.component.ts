/*******************************************************************************
********************************************************************************/

import { Component, Input, HostListener, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PopoverDirective } from 'ngx-bootstrap/popover';

import { Filter } from './models/filter';

@Component({
    selector: '[ss-filter-icon]',
    template: `
        <span [popover]="popTemplate"
            triggers=""
            #pop="bs-popover"
            [outsideClick]="true"
            placement="bottom"
        >
            <i class="filter fas fa-filter" [ngClass]="class" aria-hidden="true"></i>
        </span>

        <ng-template #popTemplate>
            <span class="filter-popover">
                <input id="searchFilter" [(ngModel)]="value" (keydown.enter)="onKeydown($event)" />
                <i class='fas fa-times-circle' (click)="clear()"></i>
                <i class='far fa-check-circle' (click)="onKeydown($event)"></i>
            </span>
        </ng-template>
    `,
    styles: [`
        .filter{
            cursor: pointer;

            display:inline;
            font-size: .75em;
            padding-left: 3px;
            color: grey;

            margin: 0 5px;
        }
        .filter-disabled{cursor: not-allowed !important;}

        .filter.active{
            color: black;
        }

        .filter-popover{
            position: relative;
        }

        input{
            padding-right: 45px;
        }

        .fa-times-circle{
            cursor: pointer;

            position: absolute;
            top: 0;
            right: 5px;
            font-size: 1.25em;
            color: blue;
        }

        .fa-check-circle{
            cursor: pointer;
            position: absolute;
            top: 0;
            right: 25px;
            font-size: 1.25em;
            color: blue;
        }
    `]
} )
export class FilterIconComponent implements OnInit, AfterViewInit {
    isDisabled: boolean = false;

    @Input('ss-filter-icon') id!: string;

    @ViewChild( 'pop' ) popover!: PopoverDirective;

    value!: string | null;
    private prevValue!: string | null;

    changeFilter: EventEmitter<Filter> = new EventEmitter<Filter>();

    class!: string;

    @HostListener( 'click', ['$event'] ) onClick( event: Event ) {
        if (this.isDisabled == true) { return };
        this.popover.show();
        event.stopPropagation();
    };

    constructor() { }

    ngOnInit() {
        this.setClass();
    }


    ngAfterViewInit(){
        this.popover.onHidden.subscribe( e => {
            this.save();
        } );
    }

    setDisabled(disabled: boolean) {
        this.isDisabled = disabled;
        this.setClass();
   }

    save() {
        if ( !this.value ) {
            this.value = null;
        }

        this.prevValue = this.value;
        this.changeFilter.emit( { id: this.id, value: this.value } );
        this.hidePopover();
    }

    clear() {
        this.value = null;
        this.save();
    }

    private hidePopover() {
        // this.popover.hide() was not working by itself, but putting it in a setTimeout() made it work.. not sure why, but thats why its in one.
        setTimeout( () => { this.popover.hide(); }, 0 );
    }

    removeFilter() {
        this.value = null;
        this.setClass();
    }

    setFilter( value: any ) {
        this.value = value;
        this.setClass();
    }

    setClass() {
        if ( this.value !== null ) {
            this.class = 'active';
        }
        else {
            this.class = 'inactive';
        }
        if (this.isDisabled == true) { this.class += " filter-disabled"}
    }

    onKeydown(event:any) {
        this.hidePopover();
        return false;
    }
}

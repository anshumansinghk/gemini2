
/**************************************************************************
*  Object Name: sort-header.component.ts
**************************************************************************/

import { Component, Input, HostListener, EventEmitter, OnInit, Output } from '@angular/core';
import { Sort } from './models/sort';

@Component({
    selector: '[se-sort-header]',
    template: `
        <span class="sort-header" [ngClass]="isDisabled == true ? 'sort-disabled':'sort-enabled'" >
            <ng-content></ng-content><i class="sort fa" [ngClass]="sortClass" aria-hidden="true"></i>
        </span>
    `,
    styles: [`
        .sort-header{

            white-space:nowrap;
        }

        .sort-enabled{cursor: pointer;}
        .sort-disabled{cursor: not-allowed;}

        .sort{
            display:inline;
            font-size: 12px;
            padding-left: 3px;
        }
    `]
} )
export class SortHeaderComponent implements OnInit {
    isDisabled:boolean = false;

    @Input('se-sort-header') id: string;
    @Output('changeSort') changeSort: EventEmitter<Sort> = new EventEmitter<Sort>();

    private asc: boolean | null = null;
    sortClass!: string;

    @HostListener('click') onClick() {
        this.changeSort.emit( { id: this.id, asc: this.asc !== null ? !this.asc : true } );
    };

    constructor() { }

    ngOnInit() {
        this.setSortClass();
    }

    setDisabled(disabled: boolean) {
        this.isDisabled = disabled;
    }

    removeSort() {
        this.asc = null;
        this.setSortClass();
    }

    setSort( isAsc: boolean ) {
        this.asc = isAsc;
        this.setSortClass();
    }

    setSortClass() {

        if ( this.asc === true ) {
            this.sortClass = 'fa-sort-down';
        }
        else if ( this.asc === false ) {
            this.sortClass = 'fa-sort-up';
        }
        else {
            this.sortClass = 'fa-sort';
        }
    }
}

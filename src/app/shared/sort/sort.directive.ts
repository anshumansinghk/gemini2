/********************************************************************************
* 
********************************************************************************/


import { Directive, Input, Output, QueryList, AfterContentInit, ContentChildren, EventEmitter, SimpleChanges } from '@angular/core';
import { SortHeaderComponent } from "./sort-header.component";
import { Sort } from './models/sort';

@Directive({
  selector: '[se-sort]'
} )
export class SortDirective implements AfterContentInit {

    @Input('seDefaultSort') defaultSort!: Sort;

    disableSort: boolean = false;
    @Input('seDisableSort') set disabled(val: boolean) {
        this.disableSort = val || false;
        this.updateSortIcons();
    }

    @Output('seSortChange') readonly sortChange = new EventEmitter<Sort>();

    @ContentChildren( SortHeaderComponent, {descendants: true} ) headers!: QueryList<SortHeaderComponent>;
    private currSort!: Sort;

    constructor() { }

    ngAfterContentInit() {
        this.headers.forEach( h => {
            h.changeSort.subscribe(( sort: Sort ) => {
                this.sort( sort );
            } );

            if ( this.defaultSort !== undefined && this.defaultSort.id == h.id ) {
                this.sort( this.defaultSort );
            }
        } );
    }

    private sort(sort: Sort) {
        if (this.disableSort !== undefined && this.disableSort == true) {
            return;
        }

        this.currSort = {
            id: sort.id,
            asc: sort.asc
        }

        this.updateSortIcons();
        this.sortChange.emit( this.currSort );
    }

    private updateSortIcons() {
        if (this.headers == null) { return }

        this.headers.forEach( (h:any) => {
            if ( h.id == this.currSort.id ) {
                h.setSort( this.currSort.asc );
            }
            else {
                h.removeSort();
            }
            h.setDisabled(this.disableSort);
        } );
    }
}

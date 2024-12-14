/********************************************************************************
* 
********************************************************************************/



import { Directive, Input, Output, QueryList, AfterContentInit, ContentChildren, EventEmitter } from '@angular/core';
import { FilterIconComponent } from "./filter-icon.component";
import { Filters } from './models/filters';
import { Filter } from './models/filter';

@Directive( {
    selector: '[ss-filter]'
} )
export class FilterDirective implements AfterContentInit {

    @Output( 'seFilterChange' ) readonly filterChange = new EventEmitter<Filters>();


    isDisabled: boolean = false;
    @Input('seDisableFilter') set disabled(val: boolean) {
        this.isDisabled = val || false;
        this.updateIcons();
    }

    @ContentChildren( FilterIconComponent, {descendants: true} ) headers!: QueryList<FilterIconComponent>;
    private currFilters: Filters = {};

    constructor() { }

    ngAfterContentInit() {

        this.headers.forEach( h => {
            h.changeFilter.subscribe( ( filter: Filter ) => {

                if ( filter.value === null ) {
                    delete this.currFilters[filter.id];

                } else {
                    this.currFilters[filter.id] = filter.value;
                }

                h.setClass();

                this.filterChange.next( this.currFilters );
            } );
        } );
    }

    private updateIcons() {
        if (this.headers == null) { return }


        this.headers.forEach(h => {
            if ( h.id in this.currFilters ) {
                h.setFilter( this.currFilters[h.id] );
            }
            else {
                h.removeFilter();
            }
            h.setDisabled(this.isDisabled);

        } );
    }
}

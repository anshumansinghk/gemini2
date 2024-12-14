/**************************************************************************
*  Revision History:
**************************************************************************/


import { Component, Input, Output, OnInit, EventEmitter, ElementRef, forwardRef, } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'ss-pager',
    templateUrl: 'ss-pager.component.html'
})



export class SsPagerComponent implements  OnInit {

    nextText: string = " "; //empty string causes control to use default labels, need spaced string to override
    previousText: string = " ";
    firstText: string = " ";
    lastText: string = " ";

    boundaryLinks: boolean = true;
    currentPage: number = 1;
    resetFlag: boolean = true;

    @Output('pageChanged') pageChanged = new EventEmitter<any>();
    @Input() totalItems: number = 0;
    @Input() disabled: boolean = false;
    @Input() itemsPerPage: number = 10;
    @Input() maxSize: number = 10;


    @Input() set page(val: number) {
        if (val == 1 && this.currentPage!=1 ) {
            // console.log("pageReset");
            this.resetFlag = false;
            setTimeout(() => {
                this.resetFlag = true;
            },0);
        }
        this.currentPage = val;
    }

    constructor(
       // private translate: TranslateService,
    ) { }

    ngOnInit() {
        this.translator();
    }

    translator() {
        //this.translate.get('next').subscribe((translated: string) => {
        //    this.nextText = translated;
        //    this.previousText = this.translate.instant('previous');
        //    this.firstText = this.translate.instant('first');
        //    this.lastText = this.translate.instant('last');

        //});
    }

    emitPageChange(e:any) {
        this.pageChanged.emit({
            page: e.page,
            itemsPerPage: this.itemsPerPage,
            totalItems:
            this.totalItems,
            maxSize: this.maxSize
        });
    }


}

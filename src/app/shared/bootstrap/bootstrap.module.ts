/**************************************************************************
*  Revision History:
*
**************************************************************************/


import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { ButtonsModule } from 'ngx-bootstrap/buttons'
import { ModalModule } from 'ngx-bootstrap/modal'
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { PopoverModule } from 'ngx-bootstrap/popover'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { TypeaheadModule } from 'ngx-bootstrap/typeahead'
import {RatingModule } from "ngx-bootstrap/rating"
@NgModule( {
    imports: [
        AlertModule.forRoot(),
        BsDatepickerModule.forRoot(),
        ButtonsModule.forRoot(),
        PaginationModule.forRoot(),
        PopoverModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        TypeaheadModule.forRoot(),
        RatingModule.forRoot()
    ],
    exports: [
        AlertModule,
        BsDatepickerModule,
        ButtonsModule,
        PaginationModule,
        PopoverModule,
        ModalModule,
        TabsModule,
        TooltipModule,
        TypeaheadModule,
        RatingModule
    ]
} )
export class BootstrapModule { }


/**************************************************************************
*  Revision History:
*
**************************************************************************/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';

import { PopoverModule } from 'ngx-bootstrap/popover';
import { TranslateModule } from "@ngx-translate/core";


import { FilterDirective } from './filter.directive';
import { FilterIconComponent } from './filter-icon.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PopoverModule.forRoot(),
        TranslateModule
    ],
    declarations: [
        FilterDirective,
        FilterIconComponent
    ],
    exports: [
        FilterDirective,
        FilterIconComponent
    ]
})
export class FilterModule { }

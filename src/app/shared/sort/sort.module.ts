import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortDirective } from './sort.directive';
import { SortHeaderComponent } from './sort-header.component';

@NgModule({
    imports: [
        CommonModule    
    ],
    declarations: [
        SortDirective,
        SortHeaderComponent
    ],
    exports: [
        SortDirective,
        SortHeaderComponent
    ]
})
export class SortModule { }

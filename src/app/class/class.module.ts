import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassRoutingModule } from './class-routing.module';
import { ClassComponent } from './class.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { SharedModule } from '../shared/shared.module';
import { VirtualVisitComponent } from './virtual-visit/virtual-visit.component';


@NgModule({
  declarations: [
    ClassComponent,
    ClassDetailComponent,
    VirtualVisitComponent
  ],
  imports: [
    CommonModule,
    ClassRoutingModule ,
    SharedModule
  ]
})
export class ClassModule { }

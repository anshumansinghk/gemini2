import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MoreRoutingModule } from './more-routing.module';
import { MoreComponent } from './more.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TearmConditionsComponent } from './tearm-conditions/tearm-conditions.component';
import { MyAccoutDetailsComponent } from './my-accout-details/my-accout-details.component';


@NgModule({
  declarations: [
    MoreComponent,
    ContactUsComponent,
    TearmConditionsComponent,
    MyAccoutDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MoreRoutingModule
  ]
})
export class MoreModule { }

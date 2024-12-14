import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TermsAndConditionsRoutingModule } from './terms-and-conditions-routing.module';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';



@NgModule({
  declarations: [
    TermsAndConditionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TermsAndConditionsRoutingModule
  ]
})
export class TermsAndConditionsModule  {constructor(){}}

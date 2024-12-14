import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanionRoutingModule } from './companion-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CompanionRoutingModule,
    SharedModule
  ]
})
export class CompanionModule { }

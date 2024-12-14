import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressRoutingModule } from './progress-routing.module';
import { ProgresspageComponent } from './progresspage/progresspage.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LearningtopicComponent } from './learningtopic/learningtopic/learningtopic.component';

@NgModule({
  declarations: [
    ProgresspageComponent,
    LearningtopicComponent
  ],
  imports: [
    CommonModule,
    ProgressRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [ProgresspageComponent],
})
export class ProgressModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WrittenpracticeRoutingModule } from './writtenpractice-routing.module';
import { WrittenpracticeComponent } from './writtenpractice/writtenpractice/writtenpractice.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    WrittenpracticeComponent
  ],
  imports: [
    CommonModule,
    WrittenpracticeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class WrittenpracticeModule { }

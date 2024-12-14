import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal/journal.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    JournalComponent
  ],
  imports: [
    CommonModule,
    JournalRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class JournalModule { }

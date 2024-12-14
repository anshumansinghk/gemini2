import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageRoutingModule } from './message-routing.module';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MessageDetailComponent
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
}) 
export class MessageModule { }

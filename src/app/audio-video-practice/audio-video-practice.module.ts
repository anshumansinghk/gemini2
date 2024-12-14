import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticeDetailComponent } from './practice-detail/practice-detail.component';
import { SharedModule } from '../shared/shared.module';
import { AudioVideoPracticeComponent } from './audio-video-practice.component';
import { AudioVideoPracticeRoutingModule } from './audio-video-practice-routing.module';


@NgModule({
  declarations: [
    AudioVideoPracticeComponent,
    PracticeDetailComponent
  ],
  imports: [
    CommonModule,
    AudioVideoPracticeRoutingModule,
    SharedModule
  ]
})
export class AudioVideoPracticeModule { }

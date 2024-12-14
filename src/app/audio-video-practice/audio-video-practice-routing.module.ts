import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioVideoPracticeComponent } from './audio-video-practice.component';
import { PracticeDetailComponent } from './practice-detail/practice-detail.component';

const routes: Routes = [
  {
    path: ':id/:type',
    component:AudioVideoPracticeComponent
  },
  {
    path : ':id/:type/practice-detail/:practice-id',
    component: PracticeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudioVideoPracticeRoutingModule { }

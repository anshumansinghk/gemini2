import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgresspageComponent } from './progresspage/progresspage.component';
import { LearningtopicComponent } from './learningtopic/learningtopic/learningtopic.component';
const routes: Routes = [
  {
    path: 'progress',
    component: ProgresspageComponent
  },
  {
    path: 'progress/learningtopic',
    component: LearningtopicComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgressRoutingModule { }

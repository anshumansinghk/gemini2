import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CommunityModule } from '../community/community.module';
import { ProgressModule } from '../progress/progress.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    CommunityModule,
    ProgressModule
  ],
  declarations: [
     DashboardComponent
  ]
})

export class DashboardModule { }

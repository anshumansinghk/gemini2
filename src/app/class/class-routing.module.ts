import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassComponent } from './class.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ClassComponent
  },
  {
    path: ':id',
    component: ClassDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }

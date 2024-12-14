import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageDetailComponent } from './message-detail/message-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MessageDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }

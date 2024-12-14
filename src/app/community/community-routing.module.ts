import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityComponent } from './community.component';
import { CommunitypostComponent } from './communitypost/communitypost/communitypost.component';
import { PostreplyComponent } from './communitypost/postreply/postreply.component';
import { CreatepostComponent } from './createpost/createpost/createpost.component';
const routes: Routes = [
  {
    path: '',
    component: CommunityComponent
  },
  {
    path: 'community/communitypost',
    component: CommunitypostComponent
  },
  {
    path: 'community/communitypost/:id',
    component: CommunitypostComponent
  },
  {
    path: 'community/postreply',
    component: PostreplyComponent
  },
  {
    path: 'community/createpost',
    component: CreatepostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }

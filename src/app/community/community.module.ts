import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community.component';
import { CommunitypostComponent } from './communitypost/communitypost/communitypost.component';
import { PostreplyComponent } from './communitypost/postreply/postreply.component';
import { CreatepostComponent } from './createpost/createpost/createpost.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    CommunityComponent,
    CommunitypostComponent,
    PostreplyComponent,
    CreatepostComponent
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: [CommunityComponent],
})
export class CommunityModule { }

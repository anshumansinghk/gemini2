import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library.component';
import { SharedModule } from '../shared/shared.module';
import { LibraryModalComponent } from './modal/library-modal/library-modal.component';
import { LibraryDetailComponent } from './library-detail/library-detail.component';

@NgModule({
  declarations: [
    LibraryComponent,
    LibraryModalComponent,
    LibraryDetailComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    SharedModule
  ]
})
export class LibraryModule { }

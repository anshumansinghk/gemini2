import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library.component';
import { LibraryModalComponent } from './modal/library-modal/library-modal.component';
import { LibraryDetailComponent } from './library-detail/library-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LibraryComponent
  },
  {
    path: 'library-filter',
    component: LibraryModalComponent,
    outlet: 'modal',
  },
  {
    path: 'library-detail',
    component: LibraryDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, RoleGuard } from '../core/guards/index';
import { CONSTANTS } from '../core/models/constants';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';



const routes: Routes = [

  {
    path: '',component: TermsAndConditionsComponent
  },
  {
    path: 'terms-and-conditions',component: TermsAndConditionsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsAndConditionsRoutingModule {
  constructor() { 
  } 
 }

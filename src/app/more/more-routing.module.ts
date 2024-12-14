import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoreComponent } from './more.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TearmConditionsComponent } from './tearm-conditions/tearm-conditions.component';
import { MyAccoutDetailsComponent } from './my-accout-details/my-accout-details.component';
const routes: Routes = [
  {
    path: '',
    component: MoreComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'tearm-conditions',
    component: TearmConditionsComponent
  },
  {
    path: 'my-accout-details',
    component: MyAccoutDetailsComponent
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoreRoutingModule { }

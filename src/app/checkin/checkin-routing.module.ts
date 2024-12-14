import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckinComponent } from './health-checkin/health-checkin.component';
import { GeneralCheckinComponent } from './general-checkin/general-checkin.component';
import { QuestionnaireComponent } from './general-checkin/questionnaire/questionnaire.component';
import { HealthActivityComponent } from './health-activity/health-activity.component';
import { SkipModalComponent } from './health-activity/skip-modal/skip-modal.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralCheckinComponent
  },
  {
    path: 'general',
    component: GeneralCheckinComponent
  },
  {
    path: 'questionnaire/:type',
    component: QuestionnaireComponent
  },
  {
    path: 'questionnaire/:type/:id',
    component: QuestionnaireComponent
  },
  {
    path: 'health',
    component: HealthCheckinComponent
  },
  {
    path: 'health-activity/:type',
    component: HealthActivityComponent
  },
  {
    path: 'health-activity/:type/:origin',
    component: HealthActivityComponent
  },
  {
    path: 'force/:type/:id',
    component: QuestionnaireComponent
  },

  {
    path: 'skip-health-checkin',
    component: SkipModalComponent,
    outlet: 'modal',
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckinRoutingModule { }

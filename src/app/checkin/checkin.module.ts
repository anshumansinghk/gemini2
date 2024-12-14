import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CheckinRoutingModule } from './checkin-routing.module';
import { GeneralCheckinComponent } from './general-checkin/general-checkin.component';
import { HealthCheckinComponent } from './health-checkin/health-checkin.component';
import { QuestionnaireComponent } from './general-checkin/questionnaire/questionnaire.component';
import { HealthActivityComponent } from './health-activity/health-activity.component';
import { SkipModalComponent } from './health-activity/skip-modal/skip-modal.component';


@NgModule({
  declarations: [
    GeneralCheckinComponent,
    HealthCheckinComponent,
    QuestionnaireComponent,
    HealthActivityComponent,
    SkipModalComponent
  ],
  imports: [
    CommonModule,
    CheckinRoutingModule,
    SharedModule
  ]
})
export class CheckinModule { }

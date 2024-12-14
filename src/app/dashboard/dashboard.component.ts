import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../header/header.service';
import { FooterService } from '../footer/footer.service';
import { DashboardService } from './services/dashboard.service';
import { AlertService } from '../shared';
import { Class, CurrentClassDetail, GroupVisit, StillDo } from './models/dashboard.model';
import { AuthService } from '../core';
import { ClassService } from '../class/services/class.service';
import { TranslateService } from '@ngx-translate/core';
import Utils from '../core/utils';


@Component({
  selector: 'ss-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isCommunityPage: boolean = false;
  username: any;

  classList: Class[] = [];
  currentClassDetails: CurrentClassDetail;
  groupDetails: {} = {};
  isCourseExpired: boolean = false;
  stillDo: StillDo[] = [];
  todayVisits: GroupVisit[];
  featureAccess:any;
  loading:boolean=true;

  constructor(
    private headerService: HeaderService,
    private footerService: FooterService,
    private dashboardService: DashboardService,
    private alerter: AlertService,
    private authService: AuthService,
    public router: Router,

    private classService: ClassService,
    private translate: TranslateService
  ) {
    this.headerService.setTitle("USER_NAME");
    this.footerService.setActiveTab("HOME");
  }

  ngOnInit() {
    this.getDashBoardData();
    this.authService.username.subscribe(updatedName => { this.username = updatedName; });
    this.authService.featuresAccessData.subscribe(upAccess => { this.featureAccess = upAccess;});
    this.authService.forceGeneralCheckin();
  }

  getDashBoardData() {
    this.dashboardService.getDashBoardData({}).subscribe(
      res => {
        if (res.status == "success") {
          const dashboardData = res.data;

          this.classList = dashboardData?.class_list;
          this.currentClassDetails = dashboardData?.current_class_detail;
          this.groupDetails = dashboardData?.group_detail;
          this.isCourseExpired = dashboardData?.is_course_expired;
          this.stillDo = dashboardData?.still_do;
          this.todayVisits = dashboardData?.today_visits;

          this.alerter.showSuccess(res.msg, true, true, false);

          this.loading =false;
        } else {
          this.loading =false;
          this.alerter.showError(res.msg, true, true, false);
        }
      },
      err => {
        this.loading =false;
      }
    );

  }
  attendanceVisitdashboard(visitId: string, url: string) {
    this.classService.attendanceVisit({ visit_id: visitId }).subscribe(
      response => {
        if (response.status == "success") {
          this.alerter.showSuccess(response.msg, true, true, false);

          if (Utils.isempty(url)) {
            this.alerter.showError(this.translate.instant('virtualVisit.urlNotFound'), true, true, false);
            return;
          }
          window.open(url, '_blank');
        } else {
          this.alerter.showError(response.msg, true, true, false);
          return this.router.navigate(['dashboard']);
        }
      },
      error => { }
    )
  }

  progressPercent(per:any){
    return +per*100;
  }
}


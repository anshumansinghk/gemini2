import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { SeValidators,AlertService } from '../../shared/index';
import { AuthService } from '../../core/index';
import { HeaderService } from '../../header/header.service';
import { TranslateService } from '@ngx-translate/core';
import { CheckInService } from "../services/check-in.service";
import Utils from "../../core/utils";

@Component({
  selector: 'ss-general-checkin',
  templateUrl: './general-checkin.component.html',
  styleUrls: ['./general-checkin.component.scss']
})

export class GeneralCheckinComponent {
  public errorFlag: boolean = false;
  public formErrors!: string[];
  public loading: boolean = true;
  // public courseEpmId:any;
  public checkinList: any;
  public accessFeature:any;
  public routePath:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private checkInService: CheckInService,
    private alerter: AlertService,
    private headerService: HeaderService,
    private translate: TranslateService,
    private authService:AuthService
    ) {    
  }

  ngOnInit(): void {
    this.routePath = this.router.url;
    this.headerService.setBack('../');

    this.authService.featuresAccessData.subscribe(upAccess => {this.accessFeature= upAccess});
    
    if(this.routePath != '/checkin/health'){
      if(this.accessFeature.features?.enable_health_check_in){
          this.loading =false;
          this.router.navigate(['/checkin/health']);
      }else{
        if(!this.authService.forceGeneralCheckin()){
          this.getGenearalList();
        }
      }
    }
  }

  getGenearalList(){
      this.checkInService.getGenearalList().subscribe(
        res => {
          if (res.status=="success") {
            this.checkinList = res.data?.list;

            // this.alerter.showSuccess(res.msg, true, true, false);
            // this.router.navigate(["/auth/login"]);
          } else {
            // this.alerter.showError(res.msg, true, true, false);
          }
          
          this.loading = false;
        },
        err => {
          this.loading = false;
        }
      );
  }

  navigateCheckin(generalCheckIn:any){    
    const courseEpmId =generalCheckIn['course_epm_id']??'';
    const survey_type = generalCheckIn['survey_type']??'';

    if(!Utils.isempty(survey_type)){
        this.router.navigate(['/checkin/questionnaire/pain/']);
    }else{
        this.router.navigate(['/checkin/questionnaire/general/'+courseEpmId]);
    }
  }
}

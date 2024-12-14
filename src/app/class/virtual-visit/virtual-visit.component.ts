import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from '../services/class.service';
import { AlertService } from '../../shared/index';
import { TranslateService } from '@ngx-translate/core';
import Utils from '../../core/utils';


@Component({
  selector: 'ss-virtual-visit',
  templateUrl: './virtual-visit.component.html',
  styleUrls: ['./virtual-visit.component.scss']
})
export class VirtualVisitComponent {
  visits:any=[];

  constructor(
    private classService:ClassService,
    private router:Router,
    private alerter: AlertService,
    private translate: TranslateService
  ) {}
  
  ngOnInit(){
    this.getVirtualVisit();
  }

  getVirtualVisit(){
    this.classService.getVirtualVisit({}).subscribe(
      response =>  { 
        if(response.status_code == 200){
          this.visits = response?.data;
        }
      },
      error => { }
    )
  }

  attendanceVisit(visitId:string,url:string){
    this.classService.attendanceVisit({visit_id:visitId}).subscribe(
      response =>  { 
        if(response.status == "success"){
          this.alerter.showSuccess(response.msg, true,true,false);

          if(Utils.isempty(url)){
            this.alerter.showError(this.translate.instant('virtualVisit.urlNotFound'), true,true,false);
            return;
          }
          window.open(url, '_blank');
        }else{
          this.alerter.showError(response.msg, true,true,false);
          // return this.router.navigate(['dashboard']);
        }
      },
      error => { }
    )
  }
}

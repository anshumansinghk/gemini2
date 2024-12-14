import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassService } from '../services/class.service';
import { AuthService } from '../../core';
import { HeaderService } from '../../header/header.service';

@Component({
  selector: 'ss-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss']
})

export class ClassDetailComponent {
  // classDetail:ClassData;
  classDetail:any;
  classId:string | null;
  loading:boolean=true;
  classObjective:any;
  featureAccess:any;
  practiceLog:any;

  progressDetail:any={
    learning_topic:{'title':'learning','icon':'learning/learning.svg','type':'learning'},
    mind_practice:{'title':'audio practice','icon':'classes-icon/meditation_pose/meditation.svg','type':'mind'},
    body_practice:{'title':'video practice','icon':'body-scan/body-scan.svg','type':'body'},
    written_practice:{'title':'written practice','icon':'classes-icon/written-practice.svg','type':'written'},
    journal:{'title':'journal','icon':'classes-icon/journal-icon/journal.svg','type':'journal'},
    community:{'title':'Community','icon':'classes-icon/community-icon/community.svg','type':'community'}
  };

  constructor(
    private classService:ClassService,
    private router:Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private headerService: HeaderService,
  ) {
    // *ngIf="featureAccess.features?.enable_community"
    // i/course/get-practice-log
    this.authService.featuresAccessData.subscribe(upAccess => { this.featureAccess = upAccess;});
  }
  
  ngOnInit(){

    this.headerService.setBack('../');
    this.route.params.subscribe((param) =>{
        this.classId =  param['id']??null;
        this.loading = true;
        this.getClassDetail();

        // this.featureAccess.features?.enable_practice_log?
        this.getPracticeLog();
    });
  }

  getPracticeLog(){
    this.classService.getPracticeLog({class_id:this.classId}).subscribe(
      response =>  { 
        if(response.status_code == 200){
          this.practiceLog = response?.data;
        }
      },
      error => { }
    )
  }
 
  getClassDetail(){
    this.classService.getClassDetail({class_id:this.classId}).subscribe(
      response =>  { 
        if(response.status_code == 200){
          this.classDetail = response?.data;
          this.classObjective = this.classDetail?.class_objective;

          const substituteClass =
          this.featureAccess?.features?.substitute_class ?? 'class';
          this.headerService.setTitle(substituteClass+' '+this.classDetail?.class_number);
          
          this.loading = false;
        }
      },
      error => { }
    )
  }

  progressPercent(per:any){
    return +per*100;
  }

  navigationActivity(type:string){
    let route = '';
    let params = {}
    switch(type){
      case 'community':
        let itemData = this.classDetail?.post_topics?.filter((item:any) => item.type == 'community')[0]??[];
        // route = 'community/communitypost/'+(itemData?.id)
        params = { 'id': itemData?.id, 'title': itemData?.title }
        route = 'community/communitypost';
      break;
      case 'journal':
        route='/journal';
        params = { 'id': this.classId, 'itemTitle': 'Journal' }
      break;
      case 'learning':
        params = { 'id': this.classId, 'itemTitle': 'Learning' }
        route = 'progress/learningtopic';
      break;
      case 'written':
        route='/writtenpractice';
        params = { 'id': this.classId, 'title': 'Written Practice' }
      break;
      case 'mind':
        route=`audio-video-practice/${this.classId}/audio`;
      break;
      case 'body':
        route=`audio-video-practice/${this.classId}/video`;
      break;

    }

    this.router.navigate([route],{queryParams: params});
  }

  updateObjective(objectiveId:string){

    this.classService.updateClassObjective({class_objective_id:objectiveId}).subscribe(
      response =>  { 
        if(response.status_code == 200){
          this.classObjective.forEach((objective:any,index:any) => {
            if(objective.id == objectiveId){
              this.classObjective[index].is_done = response?.data?.class_objective_done; 
            }
          });
        }
      },
      error => { }
    )
  }
}

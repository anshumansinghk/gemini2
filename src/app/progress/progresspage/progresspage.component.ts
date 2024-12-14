import { Component } from '@angular/core';
import { ProgressserviceService } from '../service/progressservice.service';
import { ClassService } from 'src/app/class/services/class.service';
import { ApiService } from 'src/app/core';
import { targetAssignedData, accessPercentageData, numTimesAccessData, classDetailResponse,postTopics } from '../models/progress.model'
import { HeaderService } from 'src/app/header/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-progresspage',
  templateUrl: './progresspage.component.html',
  styleUrls: ['./progresspage.component.scss']
})
export class ProgresspageComponent {
  progress: number | string = 0;
  targetAssignedData: targetAssignedData
  numTimesAccess: numTimesAccessData
  mergedData: { [key: string]: string } = {};
  classDetailResult: classDetailResponse
  classId:string
  postTopicsDetails:postTopics[]
  communityId: string;
  communityTitle: string;
  classList:any;
  constructor(private progressserviceService: ProgressserviceService,private HeaderService:HeaderService,public router: Router,public classService:ClassService) {
  }
  ngOnInit() {
    this.currentClassProgress()
    this.classDetail()
    this.classProgress()
  }
  currentClassProgress() {
    this.progressserviceService.currentClassProgress().subscribe(
      result => {
        this.progress = (+result.data.complete_status)*100;
        this.numTimesAccess = result.data.num_times_access
        this.targetAssignedData = result.data.target_assigned
        for (let i in this.targetAssignedData) {
          const targetValue = this.targetAssignedData[i as keyof typeof this.targetAssignedData];
          const targetValue2 = this.numTimesAccess[i as keyof typeof this.numTimesAccess];
          if (i == 'learning_topic') {
            this.mergedData['Learning Topic'] = `${targetValue2}/${targetValue}`;
          }
          if (i == 'mind_practice') {
            this.mergedData['Audio Practice'] = `${targetValue2}/${targetValue}`;
          }
          if (i == 'body_practice') {
            this.mergedData['Video Practice'] = `${targetValue2}/${targetValue}`;
          }
          if (i == 'community') {
            this.mergedData['Community'] = `${targetValue2}/${targetValue}`;
          }
          if (i == 'journal') {
            this.mergedData['Journal'] = `${targetValue2}/${targetValue}`;
          }
          if (i == 'written_practice') {
            this.mergedData['Written Practice'] = `${targetValue2}/${targetValue}`;
          }
        }
      },
    );
  }
  mergedDataKeys(): string[] {
    return Object.keys(this.mergedData);
  }

  classDetail() {
    this.progressserviceService.classDetail({ "class_id": "", "is_current_class": true }).subscribe(
      result => {
        this.classDetailResult = result
        this.classId=result.data.class_id;
        this.postTopicsDetails=result.data.post_topics
        for(let i of this.postTopicsDetails){
          if(i.type=='community'){
            this.communityId=i.id
            this.communityTitle=i.title
          }
        }
      },
    );
  }

  topicPage(topicType: string) {
    if (topicType == 'Learning Topic') {
      let params = { 'id': this.classId, 'itemTitle': 'Learning' }
        let Route = 'progress/learningtopic';
        this.router.navigate([Route], { queryParams: params });
    }
    if (topicType == 'Journal') {
      let params = { 'id': this.classId, 'itemTitle': 'Journal' }
        let Route = '/journal';
        this.router.navigate([Route], { queryParams: params });
    }
    if (topicType == 'Community') {
      let params = { 'id': this.communityId, 'title': this.communityTitle }
        let Route = 'community/communitypost';
        this.router.navigate([Route], { queryParams: params });
    }
    if (topicType == 'Written Practice') {
      let params = { 'id': this.classId, 'title': 'Written Practice' }
        let Route = 'writtenpractice';
        this.router.navigate([Route], { queryParams: params });
    }

    if (topicType == 'Audio Practice') {
      let route=`audio-video-practice/${this.classId}/audio`;
      this.router.navigate([route]);
    }

     if (topicType == 'Video Practice') {
        let route=`audio-video-practice/${this.classId}/video`;
        this.router.navigate([route]);
    }
  }

  classProgress(){
      this.classService.getClassList({}).subscribe(
        response =>  { 
          if(response.status_code == 200){
            this.classList = response?.data.classes;
          }
        },
        error => { }
      )
    }

    progressPercent(per:any){
      return +per*100;
    }
}






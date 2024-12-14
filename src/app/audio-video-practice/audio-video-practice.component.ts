import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AudioVideoPractiveService } from './services/audio-video-practice.service';
import { HeaderService } from '../header/header.service';
import { classPracticesListData } from './models/audio-video-practice';


@Component({
  selector: 'ss-audio-video-practice',
  templateUrl: './audio-video-practice.component.html',
  styleUrls: ['./audio-video-practice.component.scss']
})
export class AudioVideoPracticeComponent {

  classId:string | null;
  type:string | null;
  loading: boolean = false;

  classPractice:classPracticesListData[] = [];

  constructor(private headerService:HeaderService,private router: Router,private route: ActivatedRoute,private audioVideoPracticeService:AudioVideoPractiveService) {}

  ngOnInit(){

    this.loading = true;
    this.route.paramMap.subscribe(params => {
      this.classId = params.get('id');
      this.type = params.get('type');
      
      // this.headerService.setBack(`/class/${this.classId}`);
      this.headerService.setBack('../');
      this.headerService.setTitle(this.type == 'audio' ? 'Audio Practices' : 'Video Practices');
      // Optionally call the service if needed
      this.audioVideoPracticeService.getClassPractice({ class_id: this.classId, practice_type: this.type }).subscribe(
        response => {
          if(response.status_code == 200 && response.data.class_practices.length > 0){
            this.classPractice = response['data']['class_practices'];
          }
          this.loading = false;
        },
        error => {
          console.error('Error:', error);
          this.loading = false;
        }
      );
    });
  }

  openPractice(id:string){
    this.router.navigate([`/audio-video-practice/${this.classId}/${this.type}/practice-detail/${id}`]);
  }

}

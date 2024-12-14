import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/header/header.service';
import { AudioVideoPractiveService } from '../services/audio-video-practice.service';
import { practiceContent, practiceDetailData } from '../models/audio-video-practice';
// import { AudioVideoPractiveService } from '../services/audio-video-practice.service';




@Component({
  selector: 'ss-practice-detail',
  templateUrl: './practice-detail.component.html',
  styleUrls: ['./practice-detail.component.scss']
})
export class PracticeDetailComponent {

  practiceId:string | null; 
  classId:string | null;
  type:string | null;
  loading: boolean = false;
  
  url:string | URL;
  isYouTubeUrl:boolean;
  ytVideoId:string = '';
  playerVars = {
    cc_lang_pref: 'en',
    rel: 0,
    autoplay: 0,
    controls: 1,
    enablejsapi: 1, // Ensure this is set to 1
    modestbranding: 1,
  };

  contentDetails:practiceDetailData;
  fileDetail:practiceContent;
  files:practiceContent[];


  constructor(private router: Router,private audioVideoPracticeService: AudioVideoPractiveService,private route: ActivatedRoute,private headerService:HeaderService){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.practiceId = params.get('practice-id');
      this.classId = params.get('id');
      this.type = params.get('type');
    });

    this.headerService.setTitle(this.type == 'audio' ? 'Audio Practice' : 'Video Practice');
    
    this.headerService.setShowHeader(true,{'back':`/audio-video-practice/${this.classId}/${this.type}`});
    
    this.loading = true;
    this.audioVideoPracticeService.getPracticeDetail({"practice_id":this.practiceId}).subscribe(
      response => {
        if(response.status_code == 200 && response.data){
          this.contentDetails = response.data;
          if(this.contentDetails['practice_content'] && this.contentDetails['practice_content'].length > 0){
            this.files = this.contentDetails['practice_content'];
            this.files.forEach((element:any) => {
              const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)(\/.*)?$/;
              let fileDetail = element;
              let url = fileDetail.url;
              let isYouTubeUrl = youtubeRegex.test(url);
              let ytVideoId = url.split('v=')[1];
              element['isYouTubeUrl'] = isYouTubeUrl;
              element['ytVideoId'] = ytVideoId;
            });
          }
        }
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    )
  }

  done(){
    this.router.navigate([`/audio-video-practice/${this.classId}/${this.type}`]);
  }

}

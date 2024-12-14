import { Component } from '@angular/core';
import { CompanionService } from '../services/companion.service';
import { Resources, UserDataDetails } from '../models/companion';
import { HeaderService } from '../../header/header.service';

@Component({
  selector: 'ss-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  userDetails:UserDataDetails;
  resources:Resources[] = [];
  
  loading: boolean = false;

  playerVars = {
    cc_lang_pref: 'en',
    rel: 0,
    autoplay: 0,
    controls: 1,
    enablejsapi: 1, // Ensure this is set to 1
    modestbranding: 1,
  };

  constructor(private companionService: CompanionService,
     private headerService: HeaderService,
    ){
    this.getUserDetails();
    this.getCompanionDashboardDetails();
  }

  ngOnInit() {
    this.headerService.setShowHeader(true,{type:'companion'});
    this.headerService.setTitle("USER_NAME");
  }

  getUserDetails(){
    this.loading = true;
    this.companionService.getUserDetails({}).subscribe(
      response=>{
        if(response.status_code == 200){
          this.userDetails = response.data
          this.loading = false;
        }
      },
      error=>{
        this.loading = false;
      }
    )
  }

  getCompanionDashboardDetails(){
    this.loading = true;
    this.companionService.getCompanionDashboardDetails().subscribe(
      response=>{
        if(response.status_code == 200 && response.data.resources.length > 0){
          this.resources = response.data.resources;
          this.resources.forEach((element:any) => {
            const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)(\/.*)?$/;
            let fileDetail = element;
            let url = fileDetail.url;
            let isYouTubeUrl = youtubeRegex.test(url);
            let ytVideoId = url.split('v=')[1];
            element['isYouTubeUrl'] = isYouTubeUrl;
            element['ytVideoId'] = ytVideoId;
            this.loading = false;
          });
        }
      },
      error=>{
        this.loading = false;
      }
    )
  }

  openWeb(url:string | URL){
    window.open(url, '_blank');
  }

}

import { Component } from '@angular/core';
import { HeaderService } from 'src/app/header/header.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from "rxjs";
 
@Component({
  selector: 'ss-library-detail',
  templateUrl: './library-detail.component.html',
  styleUrls: ['./library-detail.component.scss']
})
export class LibraryDetailComponent {
 
  libraryData:any = history.state;
  url:any;
  isYouTubeUrl:boolean;
  ytVideoId:string = '';
  playerVars = {
    cc_lang_pref: 'en',
    rel: 0,
    autoplay: 0,
    controls: 1,
    enablejsapi: 1,
    modestbranding: 1,
  };
  assignmentContent: SafeHtml;
  headerBackRef !:Subscription;

  constructor(private sanitizer: DomSanitizer,private headerService: HeaderService,private route: Router){

    if(this.libraryData.url){
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)(\/.*)?$/;
      this.url = this.libraryData.url;
      this.isYouTubeUrl = youtubeRegex.test(this.url);
      this.ytVideoId = this.url.split('v=')[1];
    }
    if(this.libraryData.type == 'homework_assignment'){
      this.assignmentContent = this.sanitizer.bypassSecurityTrustHtml(this.libraryData.assignment);
    }
  }

  ngOnInit() {
    this.headerService.setShowHeader(true,{'back':'/library'});
    
    this.headerService.setBack('method');
    this.headerBackRef =
    this.headerService.callBackMethod.subscribe(() => {
      this.route.navigate(['/library'],{
        state:{id:this.libraryData.preId}
      });
    });
    
    this.headerService.setTitle(this.libraryData.title);
    // this.headerService.setShowFooter(true,{'type':'close','back':'../'});
 }

 done(){ 
  this.route.navigate(['/library'],{});
 }

  ngOnDestroy() {
    this.headerBackRef.unsubscribe();
  }
}
 

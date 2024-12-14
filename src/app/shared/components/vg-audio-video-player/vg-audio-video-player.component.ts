import { Component, Input } from '@angular/core';
import { VgAudioVideoService } from './services/vg-audio-video.service';
import { VgApiService } from '@videogular/ngx-videogular/core';

@Component({
  selector: 'ss-vg-audio-video-player',
  templateUrl: './vg-audio-video-player.component.html',
  styleUrls: ['./vg-audio-video-player.component.scss']
})
export class VgAudioVideoPlayerComponent {
  //common
  @Input() source: string | URL | null | undefined = ''; 
  @Input() autoplay: boolean = false; 
  @Input() loop: boolean = false; 
  @Input() fileIndex!: number; 
  @Input() resourceId!: any;
  @Input() fileType: string | null = ''; 
  @Input() classPracticeId: string = '';
  
  //video
  @Input() poster: string = ''; 
  @Input() scrubBar: boolean = true; 
  
  //audio
  @Input() audioTitle: string | null= ''; 
  
  //youtube
  @Input() videoId: string = '';
  @Input() playerVars: any = {
    cc_lang_pref: 'en',
    rel: 0,
    autoplay: 0,
    controls: 1,
    enablejsapi: 1,
    modestbranding: 1,
  };


  private player!: YT.Player;

  constructor(private vgAudioVideoService:VgAudioVideoService){}
  
  onPlayerReady(api: any) {
    if(this.fileType == 'YOUTUBE'){
      this.player = api;
      this.vgAudioVideoService.setPlayer(this.resourceId,this.fileIndex, api);
    }
    else{
      this.vgAudioVideoService.onPlayerReady(api, this.fileIndex,this.resourceId,this.classPracticeId);
    }
  }

  playVideo() {
    this.vgAudioVideoService.playFile(this.fileIndex);
    this.vgAudioVideoService.startTracking(this.fileIndex, this.resourceId,this.classPracticeId);
  }


  // Called when the player state changes
  onPlayerStateChange(event: any) {
    console.log('Player state change event:', event);

    const stateEvent = event as YT.OnStateChangeEvent;
    const player = this.vgAudioVideoService.getPlayer(this.fileIndex);

    switch (stateEvent.data) {
      case YT.PlayerState.PLAYING:
        this.vgAudioVideoService.playFile(this.fileIndex);
        this.vgAudioVideoService.startTracking(this.fileIndex, this.resourceId,this.classPracticeId);
        break;

      case YT.PlayerState.PAUSED:
      case YT.PlayerState.BUFFERING:
        this.vgAudioVideoService.stopTracking(this.fileIndex);
        break;

      case YT.PlayerState.ENDED:
        this.vgAudioVideoService.onVideoEnd(player, this.fileIndex,this.classPracticeId);
        break;

      default:
        break;
    }
  }

  ngOnDestroy() {
    // Stop tracking when the component is destroyed
    this.vgAudioVideoService.stopTracking(this.resourceId);
  }
}

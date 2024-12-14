/**************************************************************************
*  Revision History:
*
**************************************************************************/

import { Injectable } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute, UrlTree } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { VgApiService } from "@videogular/ngx-videogular/core";
import { ApiService } from 'src/app/core';



@Injectable( {
    providedIn: 'root'
})
export class VgAudioVideoService {

    private fileApis: { [key: number]: { player: any; type: 'youtube' | 'vg' } } = {};
    private currentPlayingIndex = new BehaviorSubject<number | null>(null);  
    private intervals: { [key: number]: any } = {};


    constructor( private router: Router, private apiService:ApiService ) { }

    onPlayerReady(api: VgApiService, index: number, resourceId: string,classPracticeId: string) {
        this.fileApis[index] = { player: api, type: 'vg' };
    
        api.getDefaultMedia().subscriptions.playing.subscribe(() => this.startTracking(index, resourceId,classPracticeId));
        api.getDefaultMedia().subscriptions.pause.subscribe(() => this.stopTracking(index));
        api.getDefaultMedia().subscriptions.ended.subscribe(() => this.onfileEnd(index, resourceId,classPracticeId));
    }

    playFile(index: number) {
        if (this.fileApis[index]) {
            const currentPlayer = this.fileApis[index];
    
            // Play current file
            if (currentPlayer.type === 'vg') {
                currentPlayer.player.play();
            } else if (currentPlayer.type === 'youtube') {
                currentPlayer.player.playVideo();
            }
    
            this.currentPlayingIndex.next(index);
    
            // Pause other files
            Object.keys(this.fileApis).forEach((key) => {
                const otherPlayer = this.fileApis[parseInt(key)];
                
                if (parseInt(key) !== index) {
                    
                    if (otherPlayer && otherPlayer.type === 'vg') {
                        
                        otherPlayer.player.pause();
                    } else if (otherPlayer && otherPlayer.type === 'youtube') {
                        otherPlayer.player.pauseVideo();
                    }
                }
            });
        }
    }


    private onfileEnd(index: number, resourceId: string,classPracticeId:string) {
        if (!this.fileApis[index]) return;
    
        const fileApiEntry = this.fileApis[index];
        let totalPlayerTime = 0;
        let watchedPlayerTime = 0;
    
        // Fetch total and watched times based on player type
        if (fileApiEntry.type === 'vg') {
            const api = fileApiEntry.player as VgApiService;
            totalPlayerTime = api.getDefaultMedia().duration;
            watchedPlayerTime = api.getDefaultMedia().currentTime;
        } else if (fileApiEntry.type === 'youtube') {
            const api = fileApiEntry.player as YT.Player;
            totalPlayerTime = api.getDuration();
            watchedPlayerTime = api.getCurrentTime();
        }
    
        if(classPracticeId != ''){
            const payload = {
                total_player_time: totalPlayerTime,
                watched_player_time: watchedPlayerTime,
                resource_id: resourceId,
                class_practice_id: classPracticeId
            };

            this.trackParticipantWeekFile(payload).subscribe(
                (response) => {
                    console.log('Tracking response:', response);
                },
                (error) => {
                    console.error('Error in tracking:', error);
                }
            )
        }else{
            // Prepare payload
            const payload = {
                total_player_time: totalPlayerTime,
                watched_player_time: watchedPlayerTime,
                resource_id: resourceId,
            };
        
            // Send tracking data
            this.trackResourceFile(payload).subscribe(
                (response) => {
                    console.log('Tracking response:', response);
                },
                (error) => {
                    console.error('Error in tracking:', error);
                }
            );
        }
    
        this.stopTracking(index);
    }
    

    startTracking(index: any, resourceId: string,classPracticeId:string) {
    
        if (this.intervals[index]) {
            console.warn(`Tracking already ongoing for index ${index}`);
            return;
        }
    
        if (!this.fileApis[index]) {
            console.error(`No player registered for index ${index}`);
            return;
        }
    
        const fileApiEntry = this.fileApis[index];
        let totalPlayerTime = 0;
    
        if (fileApiEntry.type === 'youtube') {
            const api = fileApiEntry.player as YT.Player;
            totalPlayerTime = api.getDuration();
        } else if (fileApiEntry.type === 'vg') {
            const api = fileApiEntry.player as VgApiService;
            totalPlayerTime = api.getDefaultMedia().duration;
        }

        this.intervals[index] = setInterval(() => {
            let watchedPlayerTime = 0;
    
            if (fileApiEntry.type === 'youtube') {
                const api = fileApiEntry.player as YT.Player;
                watchedPlayerTime = api.getCurrentTime();
            } else if (fileApiEntry.type === 'vg') {
                const api = fileApiEntry.player as VgApiService;
                watchedPlayerTime = api.getDefaultMedia().currentTime;
            }
    
            if(classPracticeId != ''){
                const payload = {
                    total_player_time: totalPlayerTime,
                    watched_player_time: watchedPlayerTime,
                    resource_id: resourceId,
                    class_practice_id: classPracticeId
                };
    
                this.trackParticipantWeekFile(payload).subscribe(
                    (response) => {
                        console.log('Tracking response:', response);
                    },
                    (error) => {
                        console.error('Error in tracking:', error);
                    }
                )
            }else{
                // Prepare payload
                const payload = {
                    total_player_time: totalPlayerTime,
                    watched_player_time: watchedPlayerTime,
                    resource_id: resourceId,
                };
            
                // Send tracking data
                this.trackResourceFile(payload).subscribe(
                    (response) => {
                        console.log('Tracking response:', response);
                    },
                    (error) => {
                        console.error('Error in tracking:', error);
                    }
                );
            }
        }, 10000); // Track every 10 seconds
    }
    
    
    stopTracking(index: any) {
        clearInterval(this.intervals[index]);
        delete this.intervals[index];
    }

    trackResourceFile(data:any):Observable<any>{
        return this.apiService.post(
            "resource/resource-access-track",data
        );
    }

    trackParticipantWeekFile(data:any):Observable<any>{
        // {
        //     "total_player_time": 579,
        //     "watched_player_time": 10,
        //     "class_practice_id": "30",
        //     "resource_id": "12"
        // }
        return this.apiService.post(
            "user/update-participant-week",data
        );
    }
  
    // Handle video end
    onVideoEnd(player: any, index: any,classPracticeId:string) {
        
        if (!player) {
            console.error('Player is null or undefined. Cannot get duration or current time.');
            return;
        }
    
        try {
            const totalPlayerTime = player.getDuration ? player.getDuration() : 0;
            const watchedPlayerTime = player.getCurrentTime ? player.getCurrentTime() : 0;
    
            if(classPracticeId != ''){
                const payload = {
                    total_player_time: totalPlayerTime,
                    watched_player_time: watchedPlayerTime,
                    resource_id: index,
                    class_practice_id: classPracticeId
                };
    
                this.trackParticipantWeekFile(payload).subscribe(
                    (response) => {
                        console.log('Tracking response:', response);
                    },
                    (error) => {
                        console.error('Error in tracking:', error);
                    }
                )
            }else{
                // Prepare payload
                const payload = {
                    total_player_time: totalPlayerTime,
                    watched_player_time: watchedPlayerTime,
                    resource_id: index,
                };
            
                // Send tracking data
                this.trackResourceFile(payload).subscribe(
                    (response) => {
                        console.log('Tracking response:', response);
                    },
                    (error) => {
                        console.error('Error in tracking:', error);
                    }
                );
            }
    
            this.stopTracking(index);
        } catch (error) {
            console.error('Error in onVideoEnd:', error);
        }
    }

    // Set player for a video
    setPlayer(resourceId: any,index:any, player: YT.Player) {
        this.fileApis[index] = { player, type: 'youtube' };
    }    
    
    // Get player for a video
    getPlayer(index: any): YT.Player | null {
        
        const fileApiEntry = this.fileApis[index];
        if (fileApiEntry && fileApiEntry.type === 'youtube') {
            return fileApiEntry.player as YT.Player;
        }
    
        console.warn(`No YouTube player found for resourceId: ${index}`);
        return null; // Return null if the player is not a YouTube player
    }
    

}

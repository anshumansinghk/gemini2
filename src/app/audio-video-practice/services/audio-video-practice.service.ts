/**************************************************************************
*  Revision History:
**************************************************************************/

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppConfig } from '../../core/app.config';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';
import Utils  from "src/app/core/utils";
import { classPractices, practiceContent, practiceDetail } from '../models/audio-video-practice';

@Injectable({
    providedIn: 'root',
})
export class AudioVideoPractiveService {

    private TOKEN_REFRESH_RATE: number;
    private siteSettings:any={};
    constructor(
        private apiService: ApiService,
        private appConfig: AppConfig,
        public router: Router,
    ) {
       this.TOKEN_REFRESH_RATE = this.appConfig.config.tokenRefreshRate * 60 * 1000;
       this.siteSettings = !Utils.isempty(this.appConfig.config?.site)?this.appConfig.config?.site:[];
    } 

    getClassPractice(data:{"class_id":string | null,"practice_type":string | null}):Observable<classPractices>{
        return this.apiService.post(
            "course/class-practices",data
        );
    }

    getPracticeDetail(data:{"practice_id":string | null}):Observable<practiceDetail>{
        return this.apiService.post(
            "course/practice-detail",data
        );
    }

}

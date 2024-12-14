/**************************************************************************
*  Revision History:
**************************************************************************/

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppConfig } from '../../core/app.config';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';
import Utils  from "src/app/core/utils";
import { LibrarayContent, LibraryFavorite, LibraryFilterMenu, libraryList } from '../models/library';

@Injectable({
    providedIn: 'root',
})
export class LibraryService {

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

    getLibraryFilterMenu():Observable<LibraryFilterMenu>{
        return this.apiService.get<string>(
            "resource/library-filter-menu"
        );
    }

    getLibraryList(data:{sort_by:string|null,menu:string,filter:string}):Observable<libraryList>{
        return this.apiService.post(
            "resource/library-list",data
        );
    }

    openLibrarayContent(data:any):Observable<LibrarayContent>{
        return this.apiService.post(
            "resource/library-content",data
        );
    }

    addFavourate(data:{resource_id:string}):Observable<LibraryFavorite>{
        return this.apiService.post(
            "resource/library-favorite",data
        );
    }

    // /resource/library-favorite

}

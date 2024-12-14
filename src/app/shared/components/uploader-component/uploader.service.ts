/**************************************************************************
*  Object Name: uploader.service.ts
**************************************************************************/

import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { map } from 'rxjs/operators';
import { HttpEventType, HttpRequest } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UploaderService {

    baseUrl: string = 'documents'
    constructor(private apiService: ApiService){
    }


    uploadFile(req:any){

        return this.apiService.fileUpload<any>(`${this.baseUrl}/upload`, req)
            .pipe(map((event: any) => {

            switch (event.type) {

                case HttpEventType.UploadProgress:
                    const progress = Math.round(100 * event.loaded / event.total);
                    return { status: 'progress', message: progress };

                case HttpEventType.Response:
                    return {status: 'response', message: event.body};

                case HttpEventType.DownloadProgress:
                    return { status: 'download', message: event.body };

                case HttpEventType.ResponseHeader:
                    return { status: 'headers', message: event.body };

                default:
                    return {status: 'error' , message: event} ;
            }

        }));
    }

}

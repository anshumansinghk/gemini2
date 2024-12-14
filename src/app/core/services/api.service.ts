/**************************************************************************
*  Revision History:
**************************************************************************/

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AppConfig } from '../../core/app.config';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { AlertService } from '../../shared/index';


@Injectable({
    providedIn: 'root',
})
export class ApiService {

    constructor( private http: HttpClient, private appConfig: AppConfig, private alertService: AlertService) { }

    //---------------------------------------------------------------------------------
    // This is just used during development to get data from files in the assets folder
    getSampleData( fileName: string ): Observable<any> {

        if ( environment.production )
            throw 'cannot use ApiService.getSampleData in production'

        let options = this.getOptions( fileName.endsWith( '.json' ) );

        return this.http.get( 'assets/_sample_data/' + fileName, options );
    }
    //---------------------------------------------------------------------------------

    get<T>( url: string, params?: object, jsonResponse: boolean = true  ): Observable<any> {
        let options:any = this.getOptions( jsonResponse );

        if ( params ) {
            options['params'] = this.getHttpParams( params );
        }

        return this.http.get<T>( this.getFullUrl( url ), options);
    }

    post<T>( url: string, body?: any, postAction: boolean = true, jsonResponse: boolean = true ): Observable<any> {
        let options = this.getOptions( jsonResponse);
        if(postAction){
            // this.alertService.actionInfoWithSpinner('saving',true);
        }
        return this.http.post<T>( this.getFullUrl( url ), body, options)
        .pipe(map((response) => {
            if(postAction){
                // this.alertService.showSuccess('saveConfirmationMessage', true,false,false);
            }
            return response;
        }),
        catchError(err => {
            this.alertError(err);
            return throwError(err);
        }));
    }


    put<T>( url: string, body?: object,postAction: boolean = true, jsonResponse: boolean = true ): Observable<any> {
        let options = this.getOptions( jsonResponse );
        if(postAction){
            // this.alertService.actionInfoWithSpinner('updating',true);
        }
        return this.http.put<T>( this.getFullUrl( url ), body, options )
        .pipe(map(response => {
            if(postAction){
                // this.alertService.showSuccess('updateCompleteConfirmationMessage', true,false,false);
            }
            return response;
        }),
        catchError(err => {
            this.alertError(err);
            return throwError(err);
        }));
    }

    delete<T>( url: string, jsonResponse: boolean = true ): Observable<any> {
        let options = this.getOptions( jsonResponse );
        // this.alertService.actionInfoWithSpinner('deleting',true);
        return this.http.delete<T>( this.getFullUrl( url ), options )
        .pipe(map(response => {
            // this.alertService.showSuccess('deleteConfirmationMessage', true,false,false);
            return response;
        }),
        catchError(err => {
            this.alertError(err);
            return throwError(err);
        }));
    }

    fileUpload<T>(url: string, body?:any){
        const req = new HttpRequest('POST', `${this.getFullUrl(url)}`, body, {
            reportProgress: true,
          });

          return this.http.request(req);
    }

    private getFullUrl( url: string ): string {
       return this.appConfig.config.apiRoot + url;
    }

    private getHttpParams( params: any ) {
        let httpParams = new HttpParams();
        Object.keys( params ).forEach( function ( key ) {
            httpParams = httpParams.append( key, params[key] );
        } );

        return httpParams;
    }

    private getOptions( jsonResponse: boolean ) {
        let options:any = {};

        if ( !jsonResponse ) {
            options['responseType'] = 'text';
        }

        return options;
    }

    private alertError(err: any) {
        if (err.status == 500) {
            this.alertService.hide();
        } else if (err.error.hasOwnProperty('errorMessage') && err.error['errorMessage'] && err.error['errorMessage'] !== '') {
            this.alertService.showError(err.error['errorMessage'],true,false,false);
        }
    }

}

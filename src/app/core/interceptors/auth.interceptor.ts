/**************************************************************************
*  Revision History:
*
**************************************************************************/

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TokenService } from './../services/token.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor( private tokenService: TokenService, private router: Router) { }

    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        // application/json
        var headers = {
            'Content-Type': 'application/x-www-form-urlencoded', 
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            'Token': '',
            // 'Site': 'Gemini',
            'Authorization' : 'Basic YXBwVXNlcjpHZW1pbmlAMjAyMQ=='
        }
        
        var token = this.tokenService.getToken();
        if ( token !== null ) {
            headers['Token'] = token;
        }

        request = request.clone( {
            setHeaders: headers
            // withCredentials:true
        } );
    
        return next.handle( request).pipe(catchError(x=> this.handleAuthError(x)));
    }
    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        if (err.status === 401 || err.status === 403) {
            //navigate /delete cookies or whatever
             this.router.navigateByUrl(`/Invalid`);
           return of(err.message); // or EMPTY may be appropriate here
        }
        return throwError(err);
    }
}

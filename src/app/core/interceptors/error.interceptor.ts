/**************************************************************************
*  Revision History:
*
**************************************************************************/


import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { TokenService } from './../services/token.service';
// import { ModalService } from "../../shared/services/modal.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenService,
        private router: Router
        // private modalService: ModalService
    ) {}

    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        return next.handle( req )
            .pipe(
            //     catchError(err => {
            //         if ( err instanceof HttpErrorResponse ) {

            //             if ( err.status === 401 || err.status == 403 ) {
            //                 this.tokenService.deleteToken();
            //                 this.router.navigate( ['login'] );
            //             }
            //             else if ( err.status === 500 ) {

            //                 //show generic exception modal
            //                 // this.modalService.openException( ['exception'] );

            //             }

            //             return observableThrowError( err );
            //         }
            //     }
            // )
        );
    }
}

/**************************************************************************
*  Revision History:

**************************************************************************/


import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// import { MomentModule } from 'ngx-moment';

import { AppConfig, initAppConfig } from './app.config';

/* Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory( http: HttpClient ) {
    return new TranslateHttpLoader( http ,'./assets/i18n/');
}


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        // MomentModule,

        TranslateModule.forRoot( {
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        } )
    ],
    providers: [
        // AuthGuard,
        // RoleGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        AppConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: initAppConfig,
            deps: [AppConfig],
            multi: true
        }
    ]
})
export class CoreModule {

    constructor( @Optional() @SkipSelf() parentModule: CoreModule ) {
        if ( parentModule ) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only' );
        }
    }
}

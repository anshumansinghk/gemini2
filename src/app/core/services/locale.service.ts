/**************************************************************************
*  Revision History:
*
**************************************************************************/

import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import localePt from '@angular/common/locales/pt';
import localePl from '@angular/common/locales/pl';
import { TranslateService } from '@ngx-translate/core'
import { defineLocale } from 'ngx-bootstrap/chronos';
import {
    arLocale, csLocale, daLocale, deLocale, enGbLocale, esUsLocale, esDoLocale,
    esLocale, fiLocale, frLocale, glLocale, heLocale, hiLocale, huLocale, idLocale,
    itLocale, jaLocale, koLocale, mnLocale, nlBeLocale, nlLocale, ptBrLocale,
    plLocale, roLocale, ruLocale, svLocale, slLocale, thLocale, trLocale, zhCnLocale
} from 'ngx-bootstrap/locale';

@Injectable({
    providedIn: 'root',
})
export class LocaleService{

  browserLang!:any
    constructor( private translateService: TranslateService ) { }

    initialize() {
        this.setupAngularLocales();
        this.setupTranslateLocales();
        this.setupBootstrapLocales();
    }

    private setupAngularLocales() {
        var locales = [localeEn, localeFr, localePt];

        locales.forEach( l => registerLocaleData( l ) );
    }

    private setupTranslateLocales() {
        var locales = ["en-US", "fr-FR", "pt-BR", "pl"];

        this.translateService.addLangs( locales );
        this.translateService.setDefaultLang( 'en-US' );

        this.browserLang = this.translateService.getBrowserCultureLang();
        //browserLang = 'pt-BR';
        this.translateService.use( this.browserLang.match( /en-US|fr-FR|pt-BR/ ) ? this.browserLang : 'en-US' );
    }

    private setupBootstrapLocales() {
        var locales = [arLocale, csLocale, daLocale, deLocale, enGbLocale, esUsLocale, esDoLocale,
            esLocale, fiLocale, frLocale, glLocale, heLocale, hiLocale, huLocale, idLocale,
            itLocale, jaLocale, koLocale, mnLocale, nlBeLocale, nlLocale, ptBrLocale,
            plLocale, roLocale, ruLocale, svLocale, slLocale, thLocale, trLocale, zhCnLocale];

        locales.forEach( function (l:any) {
            return defineLocale(l.abbr, l);
          } );
    }

}

/**************************************************************************
*  Object Name: form-errors.ts

**************************************************************************/

import { Component, Input, Renderer2, ElementRef } from '@angular/core';
import { OnInit, OnDestroy, OnChanges } from '@angular/core';
import { SubscriptionLike as ISubscription } from "rxjs";
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';


@Component( {
    selector: '[ss-form-errors]',
    template: `
        <ng-content></ng-content>
        <div ng-message="required" class="help-block"></div>
        <div ng-message="maxlength" class="help-block"></div>
        <div ng-message="minlength" class="help-block"></div>
        <div ng-message="min" class="help-block"></div>
        <div ng-message="max" class="help-block"></div>
        <div ng-message="email" class="help-block"></div>
        <div ng-message="date" class="help-block"></div>
        <div ng-message="number" class="help-block"></div>
        <div ng-message="pattern" class="help-block"></div>
        <div ng-message="begin-end-date" class="help-block"></div>
        <div ng-message="begin-date-invalid" class="help-block"></div>
        <div ng-message="custom" class="help-block"></div>
        <div ng-message="greater-than-zero" class="help-block"></div>
        <div ng-message="minDate" class="help-block"></div>
        <div ng-message="maxDate" class="help-block"></div>
        <div ng-message="minDateWithCustomLabel" class="help-block"></div>
        <div ng-message="maxDateWithCustomLabel" class="help-block"></div>
        <div ng-message="greater-than-max" class="help-block"></div>
        <div ng-message="less-than-min" class="help-block"></div>
        <div ng-message="currency-required" class="help-block"></div>
        <div *ngFor="let err of customErrors" class="help-block">{{ err }}</div>
    `,
    styles: [``]
} )

export class FormErrorsComponent implements OnInit, OnDestroy, OnChanges {

    //@Input( 'ss-form-errors' ) errors: any;

    private _errors: any;
    @Input('ss-form-errors') 
    set errors( value: any ) {
        this._errors = this.convertKeysToLowerCase(value)
        this.updateMessages();
    }

    @Input('ss-form-element') element: any;
    @Input( 'ss-form-error-name' ) errorName!: string;

    @Input('ss-custom-label') set customLabel(val: string) {
        if (val !== "") {
            const d: HTMLParagraphElement = this.renderer.createElement('div');
            d.setAttribute("ng-message", val)
            d.className = "help-block"

            this.renderer.appendChild(this.elementRef.nativeElement,d)
            this.messages = this.elementRef.nativeElement.querySelectorAll('[ng-message]');
        }
    }


    name!: string | any;
    messages!: HTMLElement[];
    private subscription!: ISubscription;
    customErrors!: string[] | any;

    constructor(
        private renderer: Renderer2,
        public elementRef: ElementRef,
        private translate: TranslateService,
        private httpClient:HttpClient
    ) {
            var locales = ["en-US", "fr-FR", "pt-BR", "pl"];
            
            this.translate.addLangs( locales );
            this.translate.setDefaultLang( 'en-US' );
            
            const browserLang:any = this.translate.getBrowserCultureLang();
            //browserLang = 'pt-BR';
            this.translate.use( browserLang.match( /en-US|fr-FR|pt-BR/ ) ? browserLang : 'en-US' );
    }

    ngOnInit() {
       
        this.messages = this.elementRef.nativeElement.querySelectorAll( '[ng-message]' );
        this.name = this.getControlName();
        this.updateMessages(false);


        if ( this.element && this.element.valueChanges ) {
            this.subscription = this.element.valueChanges.subscribe( (e: any) => {
                this.clearCustomError();
                this.updateMessages(false);
            });
        }
    }

    ngOnDestroy() {
        if ( this.subscription ) {
            this.subscription.unsubscribe();
        }
    }

    ngOnChanges() {
        this.updateMessages();
    }

    updateMessages(isShowError: boolean = true) {

        this.customErrors = null;
        if ( this._errors && this._errors.hasOwnProperty(this.name)) {
            this.customErrors = this._errors[this.name];
            setTimeout( () => this.element.setErrors( { 'hasCustomError': true }, { emitEvent: false } ) );
        }
        let message: HTMLElement;
        let errorCode:any, error:any;
        for (let i in this.messages) {
            message = this.messages[i];

            if ( message instanceof HTMLElement ) {

                if ( this.customErrors ) {
                    this.hide( message );
                    continue;
                }
                errorCode = message.getAttribute( 'ng-message' );
                error = this.element.getError( errorCode );

                if (error) {
                    if (errorCode == "custom") {
                        let errCode = this.element.getError("custom-text")
                        if (errCode != null) {
                            message.innerText = this.translate.instant(`${errCode}`, error);
                        }
                        else {
                            message.innerText = this.translate.instant(`validation.${errorCode}`, error);
                        }
                    }
                    else{
                        
                        if(errorCode=="pattern"){
                            let patternName =   this.patternName(error.requiredPattern);
                            message.innerText  = this.translate.instant(`pattern.${patternName}`, error);
                        }else{
                            let key = this.name?`validation.${this.name}.${errorCode}`:`validation.${errorCode}`;
                            let  translation = this.translate.instant(key);
                            let existKey= (translation !== key && translation !== '')?key:`validation.${errorCode}`;
                            
                            message.innerText = this.translate.instant(existKey, error);


            
                        }
                    }
                    // else {
                    //     var m = (this.custom_messages)?.[errorCode];
                        
                    //     var requiredLength = error.requiredLength;
                    //     var requiredPattern= error.requiredPattern;
                    //     message.innerText = this.translate.instant(`${m}`, error);
                    //     if(requiredLength)
                    //     {
                    //         message.innerText = message.innerText +' ' + requiredLength
                    //     }
                    //     if(requiredPattern)
                    //     {
                    //         message.innerText = message.innerText +' ' + this.name
                    //     }
                    // }

                    if(isShowError){
                        this.show(message);
                    }else{
                        this.hide(message);
                    }

                } else {
                    this.hide( message );
                }
            }
        }
    }

    private patternName( pattern:any ) {
        if(pattern == '^-?[0-9]+(?:.[0-9]{1,2})?$')
        {
            return 'decimal2digit';
        }
        else if(pattern == '^[a-zA-Z]*$')
        {
            return 'alphabateonly';
        }
        else if(pattern == '^[a-zA-Z0-9]*$' || pattern == '^[a-zA-Z0-9\-]*$')
        {
            return 'alphabatenumeric';
        }
        else if(pattern == '^[0-9]{3}[-\s\.]?[0-9]{3}$')
        {
            return 'masksix';
        }
        else if(pattern == '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&]{8,}/' || pattern=="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@!%*?&])[A-Za-z\\d$@!%*?&]{8,}/")
        {
            return 'password';
        }
        else if(pattern =='^[\x20-\x7E]{1,512}$')
        {
            return 'standard512Character';
        }
    }

    private show( element:any ) {
        this.renderer.removeClass( element, 'se-hidden' );
    }

    private hide( element:any ) {
        this.renderer.addClass( element, 'se-hidden' );
    }

    private getControlName(): string | null {
        var name;
        if ( this.errorName ) {
            name = this.errorName;
        } else {
            const formGroup = this.element.parent.controls;
            name = Object.keys( formGroup ).find( name => this.element === formGroup[name] ) || null;
        }

        return (name as any).toLowerCase();
    }

    private clearCustomError() {
        if ( this._errors && this._errors.hasOwnProperty( this.name ) ) {
            delete this._errors[this.name];
        }
    }

    private convertKeysToLowerCase( value:any ) {
        var newobj = null;

        if ( value ) {
            // Make all keys lowercase
            var key, keys = Object.keys( value );
            var n = keys.length;
            var newobj:any;
            while ( n-- ) {
                key = keys[n];
                var k:any=key.toLowerCase();
                (newobj as any)[k] = value[key];
            }
        }

        return newobj;
    }
}

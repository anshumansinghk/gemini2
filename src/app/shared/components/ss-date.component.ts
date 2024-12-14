/**************************************************************************
*  Revision History:
**************************************************************************/

import { Component, Input, OnInit, ElementRef, forwardRef, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService, BsDatepickerDirective } from "ngx-bootstrap/datepicker";
import { DateUtils } from '../services/date-utils.service';
// import { TranslateService } from '@ngx-translate/core';


export const DATE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SsDateComponent),
    multi: true,
};

@Component({
    selector: 'ss-date-component',
    template: `
         <div class="input-group"
         [ngClass]="{ 'input-group-sm': smallControl }"
         >
            <input type="text"
                class="form-control"
                [name] = "name" 
                bsDatepicker
                [(bsValue)]="bsValue"
                [minDate]="minDate"
                [maxDate]="maxDate"
                [bsConfig]="bsConfig"
                (bsValueChange)='valueChange()'
                [required]="isRequired"
                (input)="pushChanges($event)"
                #dp="bsDatepicker"
                triggers=""
                [disabled] = "isDisabled"
                [isDisabled]="isDisabled"
                (blur)="this.onTouched()"
                [placeholder]=placeholder
                [outsideClick]="true"
                [outsideEsc]="false"
                [isOpen]="isOpen"
                (onHidden)="hideCalendar()"
                (click)="toggleCalendar()"

            />
            <div class="input-group-addon" (click)="toggleCalendar()" style = "cursor:pointer;"><i class="fas fa-calendar"></i></div>
        </div>
    `,
    providers: [DATE_VALUE_ACCESSOR]
})

export class SsDateComponent implements ControlValueAccessor, OnInit {
    @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective | any;
    onChange = (_: any) => { };
    onTouched = () => { };
    modal: any;
    value: string = '';
    bsValue!: Date | any;
    isDisabled = false;
    initValue: boolean = true;
    oldValue: string = '';
    isOffset: boolean = false;
    isFirstCall: boolean = false;
    offsetDate: any;
    isOpen: boolean = false;

    @Input('name') name: any;
    @Input('minDate') minDate: any;
    @Input('maxDate') maxDate: any;
    @Input('smallControl') smallControl: boolean = false;
    @Input('placement') placement = 'top';
    @Input('placeholder') placeholder = '';
    currentDate: any;
    @Output('dateChange') dateChange: EventEmitter<any>= new EventEmitter<any>()
    writeValue(value: any): void {
        this.value = value || '';

        if (this.value != '') {
            if (this.value.toLowerCase().indexOf("t") == -1) {
                this.value += 'T00:00:00'
            }
            this.value = this.value.replace(/z$/i, "");

            if (this.value.split('T')[1] !== '00:00:00') {
                this.value = this.dateUtils.getUTCDateToLocalDate(this.value);
                this.offsetDate = this.value;
                this.isOffset = true;
                this.isFirstCall = true;
            }
            this.bsValue = new Date(this.value);
        } else if (this.value === '' || this.value === null) {
            this.bsValue = null;
        }

        this.syncValues();

    }
    toggleCalendar() {
        if (this.isOpen == true) {
            this.hideCalendar();
        }
        else {
            this.isOpen = true;
        }

    }

    hideCalendar() {
        this.isOpen = false;
        setTimeout(() => {
            this.isOpen = false;
        }, 100)
    }


    pushChanges(ignoreThisValue: any) {
        if (this.initValue == false) {
            if (this.value != this.oldValue) {
                this.onChange(this.value);
                this.dateChange.emit();
            }
            this.oldValue = this.value;
        }
        this.initValue = false;
    }

    registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
    registerOnTouched(fn: () => {}): void { this.onTouched = fn; }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    constructor(private elementRef: ElementRef,
        private dateUtils : DateUtils,
        // private translateService: TranslateService,
        private localeService: BsLocaleService) { }


    bsConfig: Partial<BsDatepickerConfig> | any;

    isRequired: boolean = false;


    @Input() set disabled(val: boolean) {
        this.isDisabled = val || false;
    }


    ngOnInit() {
        this.isRequired = this.elementRef.nativeElement.hasAttribute('required');
        this.minDate =  (this.minDate == '' ? new Date(1753, 0, 1) : new Date(this.minDate));
        this.maxDate =  (this.maxDate == '' ? new Date(9999, 11, 31) : new Date(this.maxDate));
        this.currentDate=new Date();
        let customConfig: Partial<BsDatepickerConfig> = {
            containerClass: 'theme-dark-blue',
            showWeekNumbers: false,
            dateInputFormat: 'DD-MM-YYYY',
            minDate:this.minDate,
            maxDate:this.maxDate
        }

        this.bsConfig = Object.assign({}, customConfig);

        var localeName: string = 'en';

        this.hideCalendar();

        if (localeName != 'en') {
            try {
                this.localeService.use(localeName);
            } catch (e) { }
        }
        this.onScroll();
    }

    syncValues() {
        if (this.bsValue == null || this.bsValue.getFullYear().toString().toLowerCase().indexOf('nan') > -1) {
            if ( Object.prototype.toString.call(this.bsValue) === "[object Date]" ) {
                // it is a date
                if ( isNaN( this.bsValue.getTime() ) ) {
                  // date is not valid
                  setTimeout(() => {

                    this.datepicker.bsValue = this.currentDate;
                    this.bsValue = this.currentDate;
                }, 500)
                }
              } else {
                //   not a date
              }
            this.value = '';
        }
        else {
            if(this.isOffset){
                this.value = this.bsValue.toUTCString();
            }else{
                this.value = this.stripTimeOffset(this.bsValue);
                if(this.offsetDate){
                       let comparingValue = this.stripTimeOffset(new Date(this.offsetDate));
                       if(comparingValue === this.value){
                           this.value = new Date(this.offsetDate).toUTCString();
                       }
                }
            }

        }
    }
    private padNumber(val: number): string {
        if (val < 10) {
            return "0" + val.toString()
        }
        return val.toString()
    }

    private stripTimeOffset(value: Date){
        return value.getFullYear() + '-' + this.padNumber(value.getMonth() + 1) + '-' + this.padNumber(value.getDate()) + 'T00:00:00';
    }

    valueChange() {
        if (!this.isOffset && !this.isFirstCall)
        {
            if ((this.bsValue < this.bsConfig.minDate) || (this.bsValue > this.bsConfig.maxDate)) {
                this.bsValue = new Date("foo");
            }
            this.syncValues();
        }
        if(this.isFirstCall){
            this.isFirstCall = false;
            this.isOffset = false;
        }

        this.pushChanges('');
    }

    @HostListener('window:scroll')
    onScrollEvent() {
        this.datepicker.hide();
    }

    onScroll(){
        let ele = document.getElementById('modal') as HTMLElement;
        if(ele){
            ele.addEventListener('scroll', () => {
                this.datepicker.hide();
            })
        }
    }
}

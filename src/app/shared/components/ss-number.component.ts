/**************************************************************************
*  Revision History:
 **************************************************************************/


import { Component, Input, Output, OnInit, EventEmitter, ElementRef, forwardRef, } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CurrencyUtils } from '../services/currency-utils.service';
import { CONSTANTS } from "../../core/models/index";
import { DDLBOptionString } from '../models/ddlb-option';
import { CurrencyService } from "../services/currency.service";
import { BrowserStorage } from '../services/browser-storage.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ComponentConfiguration } from '../models/custom-component-config';


export const NUMBER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SsNumberComponent),
    multi: true,
};

@Component({
    selector: 'ss-number-component',
    templateUrl: 'ss-number.component.html',
    providers: [NUMBER_VALUE_ACCESSOR]
})



export class SsNumberComponent implements ControlValueAccessor, OnInit {
    registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
    registerOnTouched(fn: () => {}): void { this.onTouched = fn; }
    onChange = (_: any) => { };
    onTouched = () => { };

    @Output('emitCurrency') emitCurrency = new EventEmitter<string>();
    @Output('amountChanged') amountChanged = new EventEmitter<string>();
    dropOffset: boolean = false;

    private timer:any = null;
    dropped: boolean = false;
    isRequired: boolean = false;
    value: any = 0;
    actualValue: any = 0;
    displayValue: string = "0";
    private currency: string = "";
    private showDecoration = false;
    decorated = false;
    private _decimalPlaces = 2;
    isDisabled = false;
    tagDisplay = "#.##";
    private shouldReformat: boolean = true;
    currencyDrop: boolean = false;
    searchBox: boolean = false;
    searchOverride: boolean = false;
    subTextValue: string = '';
    currencies!: DDLBOptionString[];
    currenciesFiltered!: DDLBOptionString[];
    private _waitForCache: boolean = false;


    searchField: UntypedFormControl = new UntypedFormControl();



    writeValue(inValue: any): void {
        this.actualValue = inValue || '0';
        this.formatValue();
    }
    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    @Input('config') config : ComponentConfiguration = {
        isKeyField: false, backgroundColor: CONSTANTS.FORM_KEY_FIELD.HIGHLIGHT_COLOR,
        borderColor: '',
        dblClick: false,
        mouseOver: false,
        onBlur: false,
        name: '',
        borderHighlight: false,
        highlightField: false,
        subText: '',
        isSeNumber: false,
        isCodeDroplist: false,
        isDatePicker: false
    };;

    @Input() set subText(val: string) {
        this.subTextValue = val || ''
        this.dropOffset = (this.subTextValue != '');
    }


    @Input() set reformat(val: string) {
        this.shouldReformat = ((val || "true").toLowerCase() == "true");
        this.formatValue();
    }

    @Input() set disabled(val: boolean) {
        this.isDisabled = val || false;
    }

    @Input() set waitForCache(val: boolean) {
        this._waitForCache = val || false;
    }

    @Input() set currencyCode(val: string) {
        var val2:string = val || '';
        val2 = (this.currencyDrop == true && val2 == '') ? "---" : val2;
        if(this.tagDisplay !== val.toUpperCase()){
            this.setCurrency((this.currencyDrop == true && (val || '') == '') ? "---" : (val || ''));
        }
    }

    @Input() set currencySelectable(val: boolean) {
        if (typeof val == 'string') {
            let v2: string = val;
            this.currencyDrop = (v2.toLowerCase() == 'y' || v2.toLowerCase() == 'true');
            this.dropped = false;
        }
        else {
            this.currencyDrop = val;
        }
        this.delayedChange(this.actualValue);

        if (this.currenciesFiltered == null && this.currencyDrop == true) {
            this.getCurrencyCodes(this._waitForCache);
        }

        if (this.currencyDrop == true && this.currency == '') {
            this.setCurrency('–––');
        }

        if (this.searchOverride == false) {
            this.searchBox = true;
        }
    }


    @Input() set currencySearchable(val: string) {
        this.searchBox = (val === 'true');
        this.searchOverride = true;
    }



    @Input() set decimalPlaces(val: number) {
        this._decimalPlaces = val || 2;
        this.formatValue();
        this.setTag();
    }

    @Input() set decorate(val: string) {
        val = val || 'false';

        this.showDecoration = (val.toLowerCase() == 'true');
        this.setTag();
    }

    @Output('emitEvent') emitEvent = new EventEmitter<any>();
    @Input('name') name: string = '';
    @Input('negativeValues') set negativeValues (val: boolean){
        this._negativeValues = val;
    };

    _negativeValues: boolean = true;



    constructor(private elementRef: ElementRef,
        private currencyService: CurrencyService,
        private currencyUtils: CurrencyUtils,
        private browserStorage: BrowserStorage
    ) { }

    ngOnInit() {
        this.isRequired =  this.elementRef.nativeElement.hasAttribute('required');
        this.onChange(this.value);


        this.searchField.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe(term => {
                term = term.toLowerCase().trim();
                if(this.currencies){
                    this.currenciesFiltered = this.currencies.filter(x => x.label.toLowerCase().indexOf(term) > -1 || x.value.toLowerCase().indexOf(term) > -1);
                }
            });
    }

    domEventEmitter($event:any){
        this.emitEvent.emit({event: $event, config: this.config});
    }

    private setTag() {
        if (this.currency == '') {
            if (this.showDecoration == true)
            {
                this.tagDisplay = this.currencyUtils.formatDecimal(0.0, this._decimalPlaces).replace(/0/g, "#");
            }
            this.decorated = this.showDecoration
        }
        else {
            this.tagDisplay = this.currency.toUpperCase();
            this.decorated = true;
        }
    }

    private getCurrencyCodes(waitForCache: boolean) {

        var storageName = "ss-number-system-currency-codes";

        let currencyCodes = this.browserStorage.get(storageName);

        if (currencyCodes == null) {

            if(waitForCache){
                this.delaySubscribeSet(500, waitForCache);
                return;
            }

            this.currencyService.getSystemCurrencyCodes()
                .subscribe((options: DDLBOptionString[]) =>{

                    this.currencies = [].concat([], (options as any));
                    this.browserStorage.set(storageName, JSON.stringify(this.currencies), 30, true);
                    this.currenciesFiltered = this.currencies;
                });
        } else {
            this.currencies = JSON.parse(this.browserStorage.get(storageName));
            this._waitForCache = false;
            this.currenciesFiltered = this.currencies;
        }
    }

    private delaySubscribeSet(waitTime: number = 100, waitForCache: boolean) {
        if (this.timer != null) {
            clearTimeout(this.timer)
        }

        this.timer = setTimeout(() => {
            this.timer = null;
            this.getCurrencyCodes(waitForCache);
        }, waitTime);
    }

    private formatValue()
    {
        if (this.shouldReformat == true) {
            this.displayValue = this.currencyUtils.formatDecimal(this.actualValue, this._decimalPlaces);
        }
        else {
            this.displayValue = this.actualValue.toString();
        }
    }

    private setValue() {
        this.value = this.actualValue;
    }

    private delayedChange(inValue :any)
    {
        this.actualValue = this.currencyUtils.parse(inValue);
        this.formatValue();
        this.setValue();
        this.onChange(this.value);
        this.amountChanged.emit(this.value);
    }

    uiChange(inValue: any) {
        this.onTouched();
        this.actualValue = this.currencyUtils.parse(inValue);
        this.setValue();
        var changeTo: number = this.actualValue;

        //for some reason, the displayed value doesn't update if the number doesn't change, so always change the number then force it back
        //this.value = this.actualValue + 1;
        this.formatValue();
        setTimeout(() => { this.delayedChange(changeTo)}, 0);
    }

    clickCurrency() {
        this.dropped = this.currencyDrop && !this.dropped;
    }

    setCurrency(val:string) {
        this.currency = val;
        this.setTag();
        this.dropped = false;
        this.searchField.setValue("");
        // this causes the subscription to formcontrol, instead we just want to push currency thats changed.
        // this.delayedChange(this.actualValue);
    }

    validate($event :any) {
        if (this._negativeValues == true) { return; }

        if($event.key === '-'){
            $event.preventDefault();
            return false;
        }
        return ($event.charCode == 8 || $event.charCode == 0) ? null : $event.charCode >= 48 && $event.charCode <= 57
    }

}

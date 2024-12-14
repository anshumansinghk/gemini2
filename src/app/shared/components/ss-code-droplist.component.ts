/**************************************************************************
*  Revision History:
 ***************************************************************************/


import { Component, Input, OnInit, ElementRef, forwardRef, EventEmitter, Output, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CodeHelper } from "../../core/models/index";
// import { CodeHelperService } from "../../core/index";
import { BrowserStorage } from '../services/browser-storage.service';
import { ConsoleInterface } from "../services/console.service";
import { SHARED_CONSTANTS } from "../models/constants"
import { TranslateService } from '@ngx-translate/core';
import { SsCodeDropListFormatDisplayPipe } from '../pipes/ss-code-format-display.pipe';

export const STRING_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SsCodeDropList),
    multi: true,
};

@Component({
    selector: "ss-code-droplist",
    templateUrl: "./ss-code-droplist.component.html",
    providers: [STRING_VALUE_ACCESSOR],
})
export class SsCodeDropList implements ControlValueAccessor, OnInit {
    isDisabled = false;
    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }
    onChange = (_: any) => {};
    onTouched = () => {};
    isRequired: boolean = false;
    _value: string = "";

    writeValue(value: string): void {
        this._value = value || "";
    }
    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    // multiselect
    @Output("emitDescription") emitDescription = new EventEmitter<
        { codeDesc: string; codeValue: string }[]
    >();

    @Input("isMulti") isMulti: boolean = false;
    @Input("enableSelectAll") set enableSelectAll (value: boolean){
        this._enableSelectAll = value;
        this.projectionsettings.enableCheckAll = value;
    };
    @Input("title") set title (value: string){
        this._title = value
    };

    @Input("includeToolTip") includeToolTip : boolean = false;

    _title: string = '';
    _enableSelectAll: boolean = false;

    codesHost: any[] = [];
    @Input("selectedCodeValues") set selectedCodeValues(val: any[]) {
        this.codesHost = val;
        this.updateOptions();
        if (this.isMulti && this.codesHost.length > 0){

        }
        this.extractCodeDesc(val);
    }
    @Input("selectedCodes") selectedCodes:any=[];
    projectionsettings = {
        text: "",
        selectAllText: "",
        unSelectAllText: "",
        enableFilterSelectAll: false,
        enableSearchFilter: true,
        maxHeight: 200,
        enableCheckAll: true,
        showCheckbox: true,
        badgeShowLimit: 3,
        noDataLabel: "",
        searchBy: [""],
        lazyLoading: true,
        primaryKey: "",
        disabled : false
    };
    // end multiselect

    private _codeType: string = "";
    private _codeSubType: string = "";
    private _serviceClass: string = "";
    isLoading = true;
    private init: boolean = true;
    private allOptions!: CodeHelper[];
    options!: CodeHelper[];
    private timer!:any;
    private _waitForCache: boolean = false;
    private _controlName: string = "";
    private sortType: string = "description";

    //value, description, valuefirst, descriptionfirst
     displayMode: string = "description";
     displaySeperator: string = " - ";
     displayPrefix: string = "";
     displaySuffix: string = "";
     _loadingMessage: string = "Loading ...";

    @Input("exclude") set exclude(value: any[]){
        if(value && value.length >= 0){
            this._exclude = value;
            this.delaySubscribe();
        }
    }

    private _sortOrder: string = 'asc';
    private _exclude: any[] = [];
    @Input("allCountryCode") allCountryCode: boolean = false;
    @Input("includeValue") includeValue: any;
    @Input() set name(val: string) {
        this._controlName = val || "";
    }
    get name(): string {
        return this._controlName;
    }

    @Input() set id(val: string) {
        this._controlName = val || "";
    }
    get id(): string {
        return this._controlName;
    }

    @Input() set value(val: string) {
        // this.seConsole.Write("Value in: " + val);
        this._value = val || "";
        this.delaySubscribe();
    }

    @Input() set disabled(val: boolean) {
        this.isDisabled = val || false;
        this.projectionsettings.disabled = this.isDisabled;
        this.projectionsettings = JSON.parse(JSON.stringify(this.projectionsettings));
    }


    @Input() set sortByValue(val: boolean) {
        if (val == true) {
            this.sortType = "value"
        }
        else {
            this.sortType = "description"
        }

        this.delaySubscribe();
    }

    @Input() set sortByOrder(val: boolean){
        if (val == true) {
            this.sortType = "order"
        }
        else {
            this.sortType = "description"
        }

        this.delaySubscribe();
    }

    @Input() set waitForCache(val: boolean) {
        this._waitForCache = val || false;
        this.delaySubscribe();
    }

    @Input() set loadingMessage(val: string) {
        this._loadingMessage = val || this._loadingMessage;
        this.delaySubscribe();
    }
    @Input() set suffix(val: string) {
        this.displaySuffix = val || this.displaySuffix;
        this.delaySubscribe();
    }
    @Input() set prefix(val: string) {
        this.displayPrefix = val || this.displayPrefix;
        this.delaySubscribe();
    }
    @Input() set seperator(val: string) {
        this.displaySeperator = val || this.displaySeperator;
        this.delaySubscribe();
    }

    @Input() set mode(val: string) {
        for (
            var i: number = 0;
            i < SHARED_CONSTANTS.DROPLIST_PRESETS.length;
            i++
        ) {
            if (
                val.toUpperCase() ==
                SHARED_CONSTANTS.DROPLIST_PRESETS[i].name.toUpperCase()
            ) {
                var settings = SHARED_CONSTANTS.DROPLIST_PRESETS[i].settings;
                this._codeType = settings.codeType;
                this._codeSubType = settings.codeSubType;
                this.displayMode = settings.displayMode;
                this.displaySeperator = settings.displaySeperator;
                this.displayPrefix = settings.displayPrefix;
                this.displaySuffix = settings.displaySuffix;

                if (settings.sortByValue == true) {
                    this.sortType = "value"
                }

                if (settings.sortByOrder == true) {
                    this.sortType = "order"
                }

                this.delaySubscribe();
                return;
            }
        }

        this.displayMode = val || this.displayMode;
        this.displayMode = this.displayMode.toLowerCase().trim();
        this.delaySubscribe();
    }

    @Input() set codeType(val: string) {
        this._codeType = val || "";

        if(this.init == true && this._codeType !== ""){
            this.init = false;
        }
        this.delaySubscribe();
    }
    @Input() set codeSubType(val: string) {
        this._codeSubType = val || "";
        this.delaySubscribe();
    }

    @Input() set serviceClass(val: string) {
        this._serviceClass = val || "";
        this.delaySubscribe();
    }

    delaySubscribe() {
        this.delaySubscribeSet();
    }
    delaySubscribeSet() {
        if (this.timer != null) {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => {
            this.timer = null;
            this.subscribe();
        }, 100);
    }

    constructor(
        private elementRef: ElementRef,
        // private codeService: CodeHelperService,
        private browserStorage: BrowserStorage,
        private seConsole: ConsoleInterface,
        private translate: TranslateService
    ) {
        this.translator();
    }

    translator() {
        this.translate.get('dropDownSelect').subscribe((translated: string) => {
            this.projectionsettings.text = translated;
            this.projectionsettings.selectAllText = this.translate.instant(
                "multiselect.selectAllText"
            );
            this.projectionsettings.unSelectAllText = this.translate.instant(
                "multiselect.unselectAllText"
            );
            this.projectionsettings.noDataLabel = this.translate.instant(
                "multiselect.noDataLabel"
            );
            this.projectionsettings.primaryKey = this.translate.instant(
                "multiselect.codeValue"
            );
            this.projectionsettings.searchBy = [
                this.translate.instant("multiselect.searchBycodeDesc"),
            ];
            this.projectionsettings = JSON.parse(JSON.stringify(this.projectionsettings));
        });
    }

    ngOnInit() {
        this.isRequired = this.elementRef.nativeElement.hasAttribute(
            "required"
        );
        this.isLoading = true;
        this.options = Object.assign(
            [],
            [
                {
                    codeDesc: "dropDownSelect",
                    codeValue: "",
                    codeType: this._codeType,
                    codeOrder: 0,
                },
            ]
        );
        if (this._codeType !== "") {
            this.init = false;
            this.delaySubscribe();
        }
    }

    private valueChange() {
        this.onChange(this._value);
    }

    uiChange(value: any) {
        this._value = value.target.value;
        setTimeout(() => {
            this.valueChange();
        }, 0);

        this.extractCodeDesc(value);
    }

    private subscribe() {
        if (this.init == true) {
            return;
        }

        var storageName = "code-" + this._codeType + "-" + this._codeSubType;
        if (this._serviceClass != "") storageName += "-" + this._serviceClass;

        if (this.browserStorage.get(storageName) == null) {
            if (this._waitForCache == true) {
                // this.seConsole.Write("Waiting for cache: " + storageName);
                this.delaySubscribeSet();
                return;
            }

            // this.seConsole.Write("loading " + storageName + " from API");
            this.isLoading = true;
            this.options = Object.assign(
                [],
                [
                    {
                        codeDesc: "loadingmessage",
                        codeValue: "",
                        codeType: this._codeType,
                        codeOrder: 0,
                    },
                ]
            );

            // this.codeService
            //     .getCodes(this._codeType, this._codeSubType, this._serviceClass, this.includeToolTip)
            //     .subscribe((options: CodeHelper[]) => {

            //         if (this.isMulti === false) {
            //             this.allOptions = [
            //                 {
            //                     codeDesc: 'dropDownSelect',
            //                     codeValue: "",
            //                     codeType: this._codeType,
            //                     codeOrder: 0,
            //                 },
            //             ];

            //         } else if (this.isMulti) {
            //             this.allOptions = [];
            //         }
            //         if (this.allCountryCode) {
            //             this.allOptions.push({
            //                 codeDesc: "all-countries",
            //                 codeValue: "ALLCOUNTRIES",
            //                 codeType: this._codeType,
            //                 codeOrder: 0,
            //             });
            //         }
            //         var allOptionTemp:any =this.allOptions;
            //         var optionsTemp:any =options;
            //         this.allOptions = [].concat(allOptionTemp, optionsTemp);

            //         this.browserStorage.set(
            //             storageName,
            //             JSON.stringify(this.allOptions),
            //             20,
            //             true
            //         );
            //         this.updateOptions();
            //     });
        } else {
            // this.seConsole.Write("loading " + storageName + " from cache");
            this.allOptions = JSON.parse(this.browserStorage.get(storageName));
            if (this.allCountryCode) {
                this.allOptions.push({
                    codeDesc: this.translate.instant("all-countries"),
                    codeValue: "ALLCOUNTRIES",
                    codeType: this._codeType,
                    codeOrder: 0,
                });
            }
            if (this.isMulti) {
                this.allOptions = this.allOptions.filter(
                    (x) => x.codeOrder !== 0 || x.codeValue.length > 0
                );
            }

            this.updateOptions();
            this._waitForCache = false;
        }
    }

    private updateOptions() {
        let showOptions = this._exclude.filter((x) => x !== this.includeValue);
        if (this.allOptions) {
            this.allOptions = this.allOptions.filter(
                (x) =>
                    x.codeValue !==
                    showOptions.find((a) => a.toString() === x.codeValue)
            );
            let options: CodeHelper[] = Object.assign([], this.allOptions);
            if (this.isMulti && this.codesHost.length > 0) {

                this.selectedCodes = this.allOptions.filter(
                    (x) =>
                        x.codeValue ===
                        this.codesHost.find(
                            (codeValue) => codeValue === x.codeValue
                        )
                );
            }

            if (this.sortType == "value") {
                // options = this.codeService.sortByValue(options);
            }
            else if (this.sortType == "order") {
                // options = this.codeService.sortByOrder(options);
            }
            else {
                // options = this.codeService.sortByDescription(options);
            }

            this.options = options;
            this.isLoading = false;
        }
    }

    extractCodeValues() {
        this.selectedCodes.sort((x:any, y:any) => (x.codeOrder > y.codeOrder ? 1 : -1));
        const codes = this.selectedCodes.map((code:any) => code.codeValue);
        this.codesHost = codes;
        this.uiChange(codes);
    }

    extractCodeDesc(val: string | any[]){
        if (Array.isArray(val)) {
            const codeDescArr = this.selectedCodes.map((code:any) => {
                let x = {
                    codeDesc: code.codeDesc,
                    codeValue: code.codeValue,
                };

                return x;
            });
            this.emitDescription.emit(codeDescArr);
        } else {
            const codeArr = [this.options.find((c) => c.codeValue === val)];

            this.emitDescription.emit(
                codeArr.map((code:any) => {
                    let x = {
                        codeDesc: code.codeDesc,
                        codeValue: code.codeValue,
                    };

                    return x;
                })
            );
        }
    }

    resetSelectedCodes() {
        this.selectedCodes = [];
    }
}

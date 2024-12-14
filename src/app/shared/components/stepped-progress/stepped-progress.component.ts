/*************************************************************************
* Object Name: stepped-progress.component.ts
* Object Type: Angular Component
* Programmer : MA
* Create Date: 11/13/2019
* Description: Stepped progress bar
*
**************************************************************************
*  Revision History:
*  11/12/2019 - MA - TFS11938 - Created
*  04/14/2020 - TS - #TFS13569 - Handle API error.
**************************************************************************/


import { Component, Input, OnInit, AfterViewInit, ElementRef, forwardRef, ViewChildren, QueryList, OnDestroy, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SteppedProgressService } from "./stepped-progress.service";
import { SubscriptionLike } from '../../commonAngular';



export const STRING_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SteppedProgress),
    multi: true,
};

@Component({
    selector: 'stepped-progress-component',
    templateUrl: './stepped-progress.component.html',
    providers: [STRING_VALUE_ACCESSOR],
    styleUrls: ['./../../../../assets/styles/css/steppedProgress.css']
})


export class SteppedProgress implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
    isDisabled = false;
    registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
    registerOnTouched(fn: () => {}): void { this.onTouched = fn; }
    onChange = (_: any) => { };
    onTouched = () => { };
    isRequired: boolean = false;
    value: string = "";
        
    private steppedLabelsSubscription: SubscriptionLike;
    private steppedProgressSubscription: SubscriptionLike;
    private els = null;
    private steps:any = [];
    private currStep = 0;
    private successEnd = true;
    private successMessage: string = "Done!"
    private errorMessage: string = "OOPS"
    private systemErrorMessage: string = "exception.generic.body"
    private spacing: number = 0;
    private lastPercentPosition = 0;
    private runnable: boolean = false;
    private cache = null;

    currentLabel: string = "";

    writeValue(value: string): void { this.value = value || ""; }
    setDisabledState(isDisabled: boolean): void { this.isDisabled = isDisabled; }

    stepConfig: any = null;

    @Input() set stepLabels(val: any) {
        if (val == null) {
            this.stepConfig = null;
            return;
        }
        this.setUpSteps(val);
    }


    constructor(private elementRef: ElementRef,
        private steppedProgress: SteppedProgressService,
    ) {
        this.steppedProgressSubscription = steppedProgress.receive.subscribe(e => {
            switch (e) {
                case "setCurrentTrue": {
                    this.doNext(true);
                    break;
                }
                case "setCurrentFalse": {
                    this.doNext(false);
                    break;
                }
                case "systemError": {
                    this.systemError();
                    break;
                }
                case "reset": {
                    if (this.cache != null) {
                        this.setUpSteps(this.cache);
                    }
                    break;
                }
            }
        });

        this.steppedLabelsSubscription = steppedProgress.labels.subscribe(e => {
            if (e == null) {
                this.stepConfig = null;
                return;
            }

            this.setUpSteps(e);
        });


    }

    @ViewChildren('stepBar') stepBar!: QueryList<any>;
    ngAfterViewInit() {
        this.stepBar.changes.subscribe(() => setTimeout(() => { this.initBar(); }, 100));
    }

    ngOnInit() { }


    ngOnDestroy(): any {
        if (this.steppedProgressSubscription) { this.steppedProgressSubscription.unsubscribe(); }
        if (this.steppedLabelsSubscription) { this.steppedLabelsSubscription.unsubscribe(); }
    }


    private setUpSteps(steps: any) {
        this.els = null;
        this.steps = [];
        this.stepConfig = null;
        this.successEnd = true;
        this.cache = steps;

        this.successMessage = steps.successMessage;
        this.errorMessage = steps.errorMessage;

        this.stepConfig = steps.steps.map(function (value:any, index:any) {
            return { label: value, success: true };
        })
        this.currStep = 0;
    }

    reset() {
        this.setUpSteps(this.cache);
    }

    systemError() {
        this.errorMessage = this.systemErrorMessage;
    }

    doNext(success: boolean) {
        if (this.runnable == false) { return };

        this.stepConfig[this.currStep].success = success;
        this.currStep += 1;

        if (this.currStep >= this.stepConfig.length) {
            this.runnable = false;
            this.progress(this.stepConfig.length + 1);
            (document.getElementById('SPstep' + (this.stepConfig.length)) as HTMLElement).classList.remove("completed", "warn","success");
            if (this.successEnd == true) {
                this.currentLabel = this.successMessage;
                (document.getElementById('stepIcon' + (this.stepConfig.length))as HTMLElement).classList.remove("fa-user");
               (document.getElementById('stepIcon' + (this.stepConfig.length))as HTMLElement).classList.add("fa-check-double");
                (document.getElementById('SPstep' + (this.stepConfig.length))as HTMLElement).classList.add("success");
            }
            else {
                this.currentLabel = this.errorMessage;
                (document.getElementById('stepIcon' + (this.stepConfig.length))as HTMLElement).classList.remove("fa-check-double");
                (document.getElementById('stepIcon' + (this.stepConfig.length))as HTMLElement).classList.add("fa-user");
                (document.getElementById('SPstep' + (this.stepConfig.length))as HTMLElement).classList.add("warn");
            }
        }
        else {
            this.currentLabel = this.stepConfig[this.currStep].label;
            this.progress(this.currStep);
        }
    }


    
    initBar() {
        if (this.stepConfig == null) { return }
        if (this.els != null) { return }
        this.els = (document.getElementsByClassName('SPstep') as any);
        Array.prototype.forEach.call(this.els, (e) => { this.steps.push(e); });
        this.runnable = true;

        let dotWidth = (document.getElementById("SPstep0") as HTMLElement).offsetWidth;
        let barWidth = (document.getElementById("SPProgress")as HTMLElement).offsetWidth + 10; //10px calculated out in the css so there's no overlap
        this.lastPercentPosition = dotWidth / 2;  //start at the midpoint of the first dot
        barWidth -= dotWidth //in order to calculate spacing from midpoint of first dot to midpoint of last dot, remove the width of a dot
        this.spacing = (barWidth / this.stepConfig.length);
        (document.getElementById('SPstep' + (this.stepConfig.length))as HTMLElement).classList.remove("completed", "warn", "success");
        this.currentLabel = this.stepConfig[this.currStep].label;
        this.progress(this.currStep);


    }


    progress(stepNum:any) {

        let spaceNum = stepNum;
        if (spaceNum > this.stepConfig.length) {
            spaceNum = this.stepConfig.length;
        }

        if (spaceNum > 0) {
            let el:any = document.getElementById('SPpercent' + (spaceNum - 1))
            el.style.left = (this.lastPercentPosition) + 'px';
            this.lastPercentPosition = this.lastPercentPosition + this.spacing

            el.style.width = (this.spacing + 'px');

            let gradient = 'GradientBB'

            if (this.stepConfig[spaceNum - 1].success == false) {
                gradient = 'GradientOB';
                this.successEnd = false;
            }

            if (spaceNum == this.stepConfig.length) {
                if (this.successEnd == true) {
                    gradient = 'GradientBG';
                }
                else {
                    if (this.stepConfig[spaceNum - 1].success == false) {
                        gradient = 'GradientOO';
                    }
                    else {
                        gradient = 'GradientBO';
                    }
                }
            }
            el.classList.add(gradient);
        }

        this.steps.forEach((e:any) => {
            if (e.id != "SPstepFin")
            {
                var numb = e.id.match(/\d/g).join("");

                if (numb == stepNum) {
                    e.classList.add('selected');
                }
                if (numb < stepNum) {
                    e.classList.remove('selected', 'success', 'warn', 'completed');

                    if (numb < this.stepConfig.length && this.stepConfig[numb].success == true) {
                        e.classList.add('completed');
                        this.convertGradient(numb);
                    }
                    else {
                        e.classList.add('warn');
                        this.convertGradient(numb);
                    }
                }
             }
       });
    }



    convertGradient(numb:any) {
        if (numb == 0) { return }
        if (numb > this.stepConfig.length - 1) { return };

        let el:any = document.getElementById('SPpercent' + (numb - 1))

        let gradient = 'Gradient'

        gradient += (this.stepConfig[numb - 1].success == true) ? "B" : "O";
        gradient += (this.stepConfig[numb].success == true) ? "B" : "O";

        el.classList.remove('GradientOB', 'GradientBB');
        el.classList.add(gradient);
    }


}

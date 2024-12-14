import { Directive, OnChanges, SimpleChanges, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[ss-required][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS, useExisting: SsNumberRequiredValidator,multi: true
        }
    ]
})
export class SsNumberRequiredValidator implements Validator{
    validator: ValidatorFn;
    private _onChange: () => void;
    @Input('isRequired') isRequired: boolean = false;
    constructor(){
        this.validator = SsNumberRequiredValidatorFactory(this.isRequired);
    }
    validate(control: AbstractControl): ValidationErrors {
        return this.validator(control);
    }
    registerOnValidatorChange?(fn: () => void): void {
        this._onChange = fn;
    }

}


function SsNumberRequiredValidatorFactory(isRequired: boolean):ValidatorFn{
    return (control : AbstractControl) => {
        let isValid = parseInt(control.value, 10) > 0;
        if(isValid && isRequired){
            return null;
        } else if(!isRequired){
            return null
        }else {
            return {required: true}
        }
    }
}

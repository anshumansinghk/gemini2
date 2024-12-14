/*************************************************************************
*  Object Name: ss-input-number.directive.ts
 *
**************************************************************************/
import { Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
    selector: '[ssNumber]'
})
export class SsInputNumberDirective{

    @Output('inputValue') inputValue: EventEmitter<number> = new EventEmitter<number>();
    constructor(private _elementRef: ElementRef){

    }

    @HostListener('input', ['$event']) onInput($event:any){
        $event.target.value = $event.target.value.replace(/[^0-9]*/g,'');
        this.inputValue.emit(+$event.target.value);
    }

    @HostListener('keydown', ['$event']) onKeydown($event:any){
        if($event.key==='.'){$event.preventDefault();}
    }
}

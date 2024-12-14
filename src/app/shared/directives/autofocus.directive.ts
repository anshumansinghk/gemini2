  

import { Directive, AfterViewInit, ElementRef } from '@angular/core';
 
@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
 
  constructor(private el: ElementRef) {
  }
 
  ngAfterViewInit() {
      setInterval(()=>{
        this.el.nativeElement.focus();
      }, 100)
  }
 
}

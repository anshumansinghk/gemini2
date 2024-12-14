/**************************************************************************
 *  Revision History:
 *
 **************************************************************************/

import { Directive, ElementRef,HostBinding,HostListener } from '@angular/core';


@Directive({
  selector: "[appHorizontalScroll]",
})
export class HorizontalScrollDirective {
  constructor(private element: ElementRef) {}

  @HostListener("drag", ["$event"])
  public onScroll(event: any) {
    console.log(event);
    this.element.nativeElement.scrollLeft += event.deltaY;
  }
}
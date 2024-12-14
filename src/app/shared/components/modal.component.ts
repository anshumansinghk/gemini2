/**************************************************************************
 *  Revision History:
 *
 **************************************************************************/
 import { Component, Input, EventEmitter, Output } from "@angular/core";
 import { ModalService } from "./../services/modal.service";

 import { OnDestroy, Renderer2 } from '@angular/core';

 
 @Component({
   selector: "ss-modal",
   templateUrl: "./modal.component.html",
 })
 export class ModalComponent {
   @Input() loading!: boolean;
   @Input() needScrollbar: boolean = true;
   @Input() fullFrame: boolean = false;
   @Input() shortFrame1200: boolean = false;
   @Input() shortFrame1000: boolean = false;
   @Input() shortFrame800: boolean = false;
   @Input() shortFrame750: boolean = false;
   @Input() shortFrame600: boolean = false;
   @Input() shortFrame680: boolean = false;
   @Input() showClose: boolean = true;
   @Input("overlayModal") overlayModal: boolean = false;
   @Output("close") close = new EventEmitter<any>();
 
   constructor(
      private modalService: ModalService, 
      private renderer: Renderer2
    ) 
    {
      this.renderer.addClass(document.body, 'modal-open');
    }

   ngOnInit() {}
 
   closeModal() {
    this.renderer.removeClass(document.body, 'modal-open');
     this.close.emit(true);
     if (!this.overlayModal) {
       this.modalService.close();
     }
   }

   ngOnDestroy(): void { 
    this.renderer.removeClass(document.body, 'modal-open');
   }
 }
 
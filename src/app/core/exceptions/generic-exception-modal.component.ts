import { Component, OnInit } from '@angular/core';

import { ModalService } from "./../../shared/services/modal.service";

@Component( {
    templateUrl: './generic-exception-modal.component.html',
    styles: [``]
} )

export class GenericExceptionModalComponent implements OnInit {
    
    constructor( private modalService: ModalService ) {}

    ngOnInit() {}

    close() {
        this.modalService.close();
    }    
}

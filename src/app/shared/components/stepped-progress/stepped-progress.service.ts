/*************************************************************************
* Object Name: stepped-progress.service.ts
**************************************************************************/


import { Component, Injectable, Output, EventEmitter } from '@angular/core'


@Injectable({
    providedIn: 'root',
})  
export class SteppedProgressService { 

    @Output() receive = new EventEmitter<string>();
    @Output() labels = new EventEmitter<any>();

    constructor() { }

    Success()
    {
        this.receive.emit("setCurrentTrue");

    }
    Fail()
    {
        this.receive.emit("setCurrentFalse");
    }

    SystemError() {
        this.receive.emit("systemError");
    }

    Reset() {
        this.receive.emit("reset");
    }

    Labels(labels:any) {
        this.labels.emit(labels);
    }

} 

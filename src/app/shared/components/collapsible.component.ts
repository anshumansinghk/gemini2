/**************************************************************************
*  Revision History:
*
**************************************************************************/

import { Component, Input, OnInit, TemplateRef, ViewContainerRef, ViewChild, HostBinding, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate, group, query, stagger, keyframes } from '@angular/animations';

@Component( {
    selector: '[se-collapsible]',
    template: `
        <div class="se-collapsible-container"
            [@collapsible]="isVisible ? 'visible' : 'hidden'"
            (@collapsible.done)="animationDone($event)"
        >
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
        :host.hide-parent{
            display: none;
        }

        .se-collapsible-container{
            overflow: inherit;
        }
    `],
    host: {
        '[class.hide-parent]': 'hideParent'
    },
    animations: [
        trigger( 'collapsible', [
            state( 'visible', style( {
                height: '*'
            } ) ),
            state( 'hidden', style( {
                height: '0px'
            } ) ),
            transition( 'visible <=> hidden', animate( 200 ) )
        ] )
    ]
} )
export class CollapsibleComponent {

    private _isVisible!: boolean;
    @Input( 'se-collapsible' ) set isVisible( value: boolean ) {
        if ( value )
            this.hideParent = false;

        this._isVisible = value;
    }
    get isVisible(): boolean {
        return this._isVisible;
    }

    @Output( 'visible-animation-done' ) isVisibleEvent: EventEmitter<any> = new EventEmitter<any>();
    
    private hideParent: boolean = true;

    constructor() { }
    
    animationDone( $event:any ) {
        if ( $event.toState == "hidden" ) {
            this.hideParent = true;
        }
        else if ( $event.toState == "visible" ) {
            this.isVisibleEvent.emit( $event );
        }
    }
}

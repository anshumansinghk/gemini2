/**************************************************************************
*  Revision History:
*
**************************************************************************/

import { Component, Input } from '@angular/core';


@Component({
    selector: 'ss-loading',
    template: `
        <div *ngIf="show"  class="backdrop"></div>
        
        <div *ngIf="show && type=='css'" class="loader spinner fa-spin" id="se-loader-display"></div>
 
        <img *ngIf="show && type=='image'" class="spinner fa-spin" src="assets/images/spinner.svg"  id="se-loader-display">

        <div *ngIf="show && type=='icon'" class="font-spinner fa-spin gm-spinner9"  id="se-loader-display"></div>
    `,
    styles: [`
        .loader {
            border: 12px solid #f3f3f3; /* Light gray */
            border-top: 12px solid #263e72; /* Custom color */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
        }
        .backdrop {
            z-index: 9999;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.6);
        }

        .spinner {
            z-index: 10000;
            position: absolute;
            top: 50%;
            left: calc(50% - 50px);
           
            width: 100px;
            height: 100px;
            -webkit-animation:spin 2s linear infinite;
            -moz-animation:spin 2s linear infinite;
            animation:spin 2s linear infinite;
        }

        .font-spinner {
            z-index: 10000;
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 20vh;
            color:#F29840;
            -webkit-animation:spin 2s linear infinite;
            -moz-animation:spin 2s linear infinite;
            animation:spin 2s linear infinite;
        }

        @-moz-keyframes spin { 
            100% { -moz-transform: rotate(360deg); } 
        }
        @-webkit-keyframes spin { 
            100% { -webkit-transform: rotate(360deg); } 
        }
        @keyframes spin { 
            100% { 
                -webkit-transform: rotate(360deg); 
                transform:rotate(360deg); 
            } 
        }
    `]
} )
export class LoadingComponent {
  
  constructor() { }

  @Input() show: boolean = false;
  @Input() type: string = 'css';
 
}

/**************************************************************************
*  Revision History:
*
**************************************************************************/

import { Injectable } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute, UrlTree } from "@angular/router";
import { Subject } from "rxjs";
import { ModalClose } from "./../modal-close";


@Injectable( {
    providedIn: 'root'
})
export class ModalService {

    onOpen: Subject<any> = new Subject<any>();
    onChange: Subject<any> = new Subject<any>();
    onClose: Subject<any> = new Subject<any>();
    
    isException: boolean = false;

    constructor( private router: Router ) { }
    
    routesAreEqual( route1: string[], route2: string[] ) {
        return route1 && route2 && route1.length == route2.length && route1.every(( v, i ) => v === route2[i] );
    }
    
    open( route: any[], params?: any ) {
        this.changeRoute( route, params )
            .then(() => this.onOpen.next() );
    }

    openException( route: any[], params?: any ) {
        this.isException = true;
        this.open( route, params );
    }


    change( route: any[], params?: any ) {
        this.changeRoute( route )
            .then(() => this.onChange.next() );
    }

    close( returnObject?: any ) {
        let route = this.getCurrentModalRoute();
        this.changeRoute(null)
            .then(() => {
                this.onClose.next( { route: route, data: returnObject } );
            } );
    }
    
    private changeRoute( route: any[] | any, params?: any ): Promise<boolean> {
        let localRoute = route != null ? Object.assign( [], route ) : route;
        let navigationExtras: NavigationExtras = {
            queryParamsHandling: "merge",
            queryParams: params,
            skipLocationChange: true
        };
        
        let outlets:any = {};
        if ( this.isException ) {
            outlets['exception'] = localRoute;
            navigationExtras.skipLocationChange = true;

            // exception modal is closed
            if ( !route ) {
                this.isException = false;
            }

        } else {
            outlets['modal'] = localRoute;
        }

        return this.router.navigate( [{ outlets: outlets }], navigationExtras );
    }

    private getCurrentModalRoute() {


        const tree: UrlTree = this.router.parseUrl( this.router.url );

        let outlets = tree.root.children;
        let outlet = this.isException ? outlets.exception : outlets.modal;
        let route = Object.assign( [], outlet.segments ).map( a => {(a as any).path} );
                
        return route;
    }

    public forceHideModal(){
        const modalView = (document.querySelector('.p-modal') as HTMLElement);
        const bodyView = (document.body as HTMLElement);

        console.log('>>',modalView);
        if(modalView != null){
            bodyView.classList.remove('modal-open');
            modalView.setAttribute("style", "display:none;opacity:0;z-index:-999");
            location.reload();
        }
    }
}

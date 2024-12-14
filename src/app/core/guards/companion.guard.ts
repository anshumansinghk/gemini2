/**************************************************************************
*  Revision History:

**************************************************************************/

import { Injectable } from '@angular/core';
import { CanActivateChild, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn:'root'
})
export class CompanionGuard implements CanActivateChild, CanActivate {

    constructor( private authService: AuthService, private router: Router ) { }

    canActivateChild( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
        
        
        if ( !this.authService.isAuthenticated('4') ) {
            this.router.navigate(['auth']);
            return false;
        }

        this.authService.startTokenRefresh();
        
        return true;
    }

    canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
        return this.canActivateChild(next, state);
    }
}

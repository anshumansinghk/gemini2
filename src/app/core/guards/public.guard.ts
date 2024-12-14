import { Injectable } from '@angular/core';
import { CanActivateChild, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './../services/auth.service';
import { HeaderService } from '../../header/header.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn:'root'
})
export class PublicGuard implements CanActivateChild, CanActivate {

    constructor( private authService: AuthService, private router: Router,private headerService:HeaderService ) { }

    canActivateChild( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
        let route = state.url;
        if (this.authService.isAuthenticated('3')) {
            this.router.navigate(['dashboard']);
            return false;
        }else if(this.authService.isAuthenticated('4')){
            this.router.navigate(['companion']);
            return false;
        }
        // this.headerService.setShowHeader(false);
        // this.headerService.setShowFooter(false);
        return true;
    }

    canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
        return this.canActivateChild(next, state);
    }
}

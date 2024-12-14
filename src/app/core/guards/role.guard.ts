/**************************************************************************
*  Revision History:
*
**************************************************************************/

import { Injectable } from '@angular/core';
import { CanActivateChild, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable} from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { CONSTANTS } from './../models/constants';

import { AuthService } from '../services/auth.service';
import { PermissionService } from '../services/permission.service';

@Injectable()
export class RoleGuard implements CanActivateChild {

    constructor(private authService: AuthService, private permissionService: PermissionService) { }



  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean> | boolean {

    // let requiredGrant = next.data.requiredGrant;

    // if ( requiredGrant ) {

    //     if (requiredGrant.grantType == CONSTANTS.GRANT_TYPE.CLASS_SUBCLASS) {

    //     let objectClass = next.queryParams[requiredGrant.classProperty],
    //       objectSubClass = next.queryParams[requiredGrant.subClassProperty],
    //         sectionFunction = requiredGrant.sectionFunction;

    //     return this.permissionService.getGrantCode( objectClass, objectSubClass, sectionFunction )
    //         .pipe(flatMap(grantObject => {
    //         return this.isAuthorized( grantObject, requiredGrant.permission );
    //       }));

    //   }
    //     else if (requiredGrant.grantType == CONSTANTS.GRANT_TYPE.ORGANIZATION_CLASS) {

    //         var url = state.url;


    //         var workArray = url.split("/");

    //         if (workArray.length < 3)
    //             return false;

    //         if (workArray[1] != CONSTANTS.APPLICATION_ROUTES.ORGANIZATION)
    //             return false;

    //         var organizationId = workArray[2];


    //         return this.permissionService.getOrganizationClass(organizationId)
    //             .pipe(flatMap(orgClass => {
    //                 var grantObject = orgClass + "." + requiredGrant.grantObject;

    //                 return this.isAuthorized(grantObject, requiredGrant.permission);
    //             }));



    //   }
    //   else {
    //     return this.isAuthorized( requiredGrant.grantObject, requiredGrant.permission );

    //   }
    // }


    return true;
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | boolean {
      return this.canActivateChild( next, state );
  }

  // private isAuthorized(grantObject: string, permission: string): Observable<boolean> {

  //     // return this.authService.isAuthorized(grantObject, permission);
  //       return false;

  // }
}

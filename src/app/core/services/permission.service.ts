/**************************************************************************
*  Revision History:
* 
**************************************************************************/

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PermissionService {

    orgClassMap : Map<string, string>= new Map();

  constructor( private apiService: ApiService ) { }

  getGrantCode( objectClass: string, objectSubClass: string, sectionFunction: string ): Observable<string> {
    return this.apiService.get( "grant", { objectClass, objectSubClass, sectionFunction });
  }

  getOrganizationClass(id: string): Observable<string> {
      if(!this.orgClassMap.has(id)){
        return this.apiService.get('organizations/' + id + '/org-class').pipe((map(orgClass => {
            if(!this.orgClassMap.has(id)){
                this.orgClassMap.set(id, orgClass);
            }
          return orgClass;
        })));
      } else{
        return new Observable<any>( observer => {
            let orgClass = this.orgClassMap.get(id);
            observer.next( orgClass );
            observer.complete();
        } );
      }
  }

}

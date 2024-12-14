import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Config } from '../core/models/config';
 
export function initAppConfig( config: AppConfig ) {
    return () => { return config.load(); }
}
 
@Injectable()
export class AppConfig {
    private http!: HttpClient;
 
    public config!: Config;
 
    constructor( private injector: Injector ) { }
 
    load(): Promise<any>{
          this.http = this.injector.get( HttpClient );
          let configName: string = environment.configFileName;
          let ret = this.http
            .get<Config>( `./configs/${configName}` )
            .toPromise()
            .then( data => this.config = data );

            // let ret = this.http
            // .get<Config>( `./configs/${configName}` )
            // .toPromise()
            // .then( data => this.config = data );

          return ret;
    }
}
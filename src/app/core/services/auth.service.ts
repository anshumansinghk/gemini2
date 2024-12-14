/**************************************************************************
*  Revision History:
*  
**************************************************************************/

import { Injectable, isDevMode } from "@angular/core";
import { Observable , BehaviorSubject ,Subject} from "rxjs";
import { TranslateService } from "@ngx-translate/core";

import * as moment from "moment";

import { ApiService } from "./api.service";
import { TokenService } from "./token.service";
import { AppConfig } from "./../app.config";
import { map } from "rxjs/operators";
import { Profile,LoginRequest } from "./../models/index";
import { DateUtils } from "src/app/shared/services/date-utils.service";
import { ICheckEmail, IFCommonMsg, IForgotPassword } from "src/app/auth/forgot-password/forgot-password.model";
import { IChangePassword, IResetPassword } from "src/app/auth/reset-password/reset-password.model";
import { Router,ActivatedRoute } from "@angular/router";
import { AlertService } from "../../shared/index";
import { HeaderService } from "src/app/header/header.service";
import { ModalService } from "src/app/shared/services/modal.service";
import Utils  from "src/app/core/utils";
import { FeaturesAccess, PreForceGeneralData } from '../models/config';


@Injectable({
    providedIn: "root",
})
export class AuthService {
    private TOKEN_REFRESH_RATE: number;
    private TOKEN_FAILURE_REFRESH_RATE: number = 15000; //seconds
    private MAX_TOKEN_REFRESH_FAILURES: number = 1;
    // private MAX_TOKEN_REFRESH_FAILURES: number = 1;
    private tokenTimeout: any = null;
    private tokenRefreshInProgress: boolean = false;
    private tokenRefreshFailureTimeout: any = null;
    private tokenRefreshFailureCount: number = 0;
      profile!: Profile;
    private siteSettings:any={};
    // private featuresAccess!:FeaturesAccess;
    private featuresAccess: FeaturesAccess={};

    constructor(
        private tokenService: TokenService,
        private apiService: ApiService,
        private dateUtils: DateUtils,
        private appConfig: AppConfig,
        private headerService:HeaderService,
        private alerter: AlertService,
        public router: Router,
        private modalService: ModalService,
        private translate: TranslateService,
        private route: ActivatedRoute
    ) {
       this.TOKEN_REFRESH_RATE = this.appConfig.config.tokenRefreshRate * 60 * 1000;
       this.siteSettings = !Utils.isempty(this.appConfig.config?.site)?this.appConfig.config?.site:{};
       this.featuresAccess = !Utils.isempty(this.appConfig.config?.access)?this.appConfig.config?.access:{};
    } 

    // login(username: string, password: string, remember_me: boolean): Observable<any> {
    login(reqBody:LoginRequest):Observable<any>{
        return this.apiService
            .post("auth/login", reqBody, false)
            .pipe(
                map((response) => {
                    if (response.status=="success")
                    {
                        this.tokenRefreshFailureCount = 0;
                        this.tokenService.setToken(response.token);
                        this.checkLogin();
                        this.startTokenRefresh();
                    }
                    return response;
                })
            );
    }


    logout(msgKey:string=""): void {
        // this.updateLogoutTime();
        this.tokenService.deleteToken();
        localStorage.clear();
        this.stopTokenRefresh();
        sessionStorage.clear();

        this.modalService.forceHideModal();

        this.router.navigate(['/auth']).then(() => {
            this.headerService.setShowHeader(false);
            this.headerService.setShowFooter(false);
            this.alerter.showError(this.translate.instant(msgKey==""?"auth.sessionExpired":"auth."+msgKey), true,true,false);
            
            history.pushState(null, '', location.href);
            window.onpopstate = function () {
            history.go(1);
            };
        });
    }


    // /user/user-detail

    updateLogoutTime() {
        let data = {};
        return this.apiService.post("auth/update-logout-time", data, true).subscribe(
            (response) => {}
        );
    }


    isEmailUnique(data:ICheckEmail): Observable<IFCommonMsg> {
		return this.apiService.post(
			"auth/check-email",
			data,
			true
		);
	}
    forgot_password(data:IForgotPassword) {
		return this.apiService.post(
			"auth/forgot-password",
			data
		);
	}

    resetPasswordCode(data:IResetPassword): Observable<any> {
		return this.apiService.post(
			"auth/reset-password-code",
			data
		);
	}  

    changePassword(data:IChangePassword): Observable<any> {
        return this.apiService.post(
            "auth/reset-password",
            data
        );
    }
    
    updateSessionTime(data:any): Observable<any> {
		return this.apiService.post(
			"auth/update-session-time",
			data
		);
	}


    getOrgGrantCode(id: number, grantCode: string) {
        return this.apiService.get<string>(
            "organizations/ " +
                id +
                "/org-grant-code/" + grantCode

        );
    }


    getProfile() {
      if (!this.profile) {
          return this.apiService.get("profile").pipe(
              map((response) => {
                  this.profile = response;
                  return this.profile;
              })
          );
      } else {
          return new Observable<any>((observer) => {
              observer.next(this.profile);
              observer.complete();
          });
      }
    }

    isAuthenticated(role:string): boolean {
        var tokenRole =this.tokenService.getRole();
        
        if(role!=tokenRole){
            return false;
        }

        var authenticated = !this.tokenService.isTokenExpired();

        if (authenticated == true) {

            var url = new URL(window.location.href);

            var isLogin =this.tokenService.isLogin();
            var token =this.tokenService.getToken();
            
            if (isLogin) {
              //  this.consoleLog("found URL token -Validating");
                this.tokenService.setTokenImp(token, this.appConfig.config.sessionTimeOut);
                this.startTokenRefresh();
            }
        }

        return authenticated;
    }

    isLogin(): boolean {
        var isLogin = this.tokenService.isLogin();
       
        return isLogin;
    }

    // arg1 can be the full grant, or just the grantObject
    // if arg1 is just the grantObject, arg2 is expected to be the permissions
    // isAuthorized(arg1:any, arg2:any) {
    //     var grant =
    //         arg1 && arg2 ? { grantObject: arg1, permission: arg2 } : arg1;

    //         return this.getProfile().pipe(
    //           map((profile) => {
    //               return this.grantComparison(profile.grants, grant);
    //           })
    //       );

    // }

    // private grantComparison(grants: string, grant: string) {
    //     var ret = false;

    //     for (var i = 0, len = grants.length; i < len; i++) {
    //         // if (
    //         //     grants[i].grantObject.toUpperCase() ==
    //         //         grant.grantObject.toUpperCase() &&
    //         //     grants[i].permission.toUpperCase() ==
    //         //         grant.permission.toUpperCase()
    //         // ) {
    //         //     ret = true;
    //         //     break;
    //         // }
    //     }

    //     return ret;
    // }

    startTokenRefresh(): void {
        if (this.tokenTimeout != null) {
            return;
        } //no need to do set a timer, it's already set
        // console.log('this.tokenTimeout--',this.tokenTimeout)

        let now = this.dateUtils.now();
        // console.log('now--',now)

        let expireDate = this.tokenService.getTokenExpireDate();
        // console.log('this.expireDate--',expireDate)

        if (now.isAfter(expireDate)) {
            // console.log("token expired - refreshing");
            this.logout();
            // this.stopTokenRefresh();
            // this.refreshToken();
        } else {
            // console.log("refresh token at it's half-life");
            //refresh token at it's half-life (like DNS leases do)
            var halfLifeSeconds = (this.appConfig.config.tokenRefreshRate * 60) / 2;

            var halfLife = moment(expireDate).subtract(
                halfLifeSeconds,
                "seconds"
            );

            // console.log("Expires at " + expireDate.format("h:mm:ss a"))
            // console.log("Halflife at @ " + halfLifeSeconds + " seconds = " + halfLife.format("h:mm:ss a"))
            
            if (now.isAfter(halfLife)) {
                // console.log("token halflife passed - refreshing");
                this.logout();
                // this.stopTokenRefresh();
                // this.refreshToken();
            } else {
                var refreshRate = halfLife.valueOf() - now.valueOf();

                // console.log(
                //     "token timer started: " + refreshRate + " ms until trigger"
                // );
                this.tokenTimeout = setTimeout(() => {
                    // this.stopTokenRefresh(); 
                    //sets it to null so it can be re-introduced
                    // console.log('this.isAuthenticated()',this.isAuthenticated())

                    if (!(this.isAuthenticated('3') || this.isAuthenticated('4'))) {
                        console.log( "token timer - no longer authenticated");
                        this.stopTokenRefresh();
                        this.tokenRefreshFailed();
                    } else {
                        // console.log("token timer - still authenticated, refreshing token" );
                        this.refreshToken();
                    }
                }, this.TOKEN_FAILURE_REFRESH_RATE);
            }
        }
    }

    stopTokenRefresh(): void {
        this.tokenRefreshInProgress = false;
        clearTimeout(this.tokenTimeout);
        this.tokenTimeout = null;
    }

    // requests new token from app api
    refreshToken() {
        this.tokenRefreshInProgress = true;

        return this.apiService.post("auth/check-login", true, false).subscribe(
            (response) => {
                if(response.status == "success")
                {
                    this.tokenRefreshFailureCount = 0;
                    this.stopTokenRefresh();
                    this.startTokenRefresh();
                    // Our code
                 
                    var isLogin =this.tokenService.isLogin();
                    // console.log('document.activeElement', document.activeElement?.tagName);
                    if (isLogin && document.hasFocus()) {
                        //this.updateSessionTime({ showSpinner: false, focus: true }).subscribe();
                    }

                }else{
                    this.tokenRefreshFailed();
                }
                //this.consoleLog('token Refreshed: ' + response.token);
            },
            (error) => {
                this.tokenRefreshFailed();
            },
            () => {
                this.tokenRefreshInProgress = false;
            }
        );
    }


    checkLogin(){
        return this.apiService.post("auth/check-login", true, false).subscribe(
            (response) => {
                if(response.status=="success"){
                    // token valid action
                    this.tokenRefreshFailureCount = 0;
                }else{
                    this.tokenRefreshFailed();
                }
            },(error) => {
                this.tokenRefreshFailed();
            },() => {
                this.tokenRefreshInProgress = false;
            }
        );
    }

    private tokenRefreshFailed() {
        this.tokenRefreshFailureCount+= 1
        if (this.tokenRefreshFailureCount >= this.MAX_TOKEN_REFRESH_FAILURES && this.isLogin()==true) {
            this.stopTokenRefresh();
        
            this.logout();
        
        }else{
             this.tokenRefreshFailureTimeout = setTimeout(() => {
                this.refreshToken();
            }, this.TOKEN_FAILURE_REFRESH_RATE);
        }
    }


    isLogout(): boolean {
        var isLogout = this.tokenService.isLogin();
        if(isLogout==false)
        {
            this.router.navigate(['/auth']);
        }
        return isLogout;
    }
    

    username = new BehaviorSubject(localStorage.getItem("name"));
    getSiteData = new BehaviorSubject(this.siteSettings);

    setSiteData(){
        if(!this.isLogin()){
            this.getSiteData.next(this.siteSettings);
            return;
        }

        return this.apiService.post("auth/get-site-data", true, false).subscribe(
            (response) => {
                if(response.status=="success"){
                    const settings = !Utils.isempty(response?.data.site)?response?.data.site:[];

                    let nextSettings:any = this.siteSettings;
                    settings.forEach((setting:any)=>{
                        let type = setting['type']??null, key = setting['key']??null,value = setting['value']??null;
                        switch(type){
                            case 'text':
                            case 'textbox':
                                nextSettings[key] = value;
                            break;
                            case 'image':
                                if(Array.isArray(value)){
                                    let imageUrl = value[0]?.url??'';
                                    !Utils.isempty(imageUrl)?nextSettings[key] = imageUrl:'';
                                }
                            break;
                        }
                    })
                    this.getSiteData.next(nextSettings);
                    this.username.next(localStorage.getItem("name"));
                }
            },
            (error) => {
                console.log('Site error ',error);
            }
        );

    }

    substitute = new BehaviorSubject({'substitute_class':'class'});
    // feature access
    featuresAccessData = new BehaviorSubject(this.featuresAccess);

    setFeaturesAccessData(){
        return this.apiService.get("user/partcipant-features-access", {}, true).subscribe(
            (response) => {
                if(response.status=="success"){
                    const nextFeatures = !Utils.isempty(response?.data)?response.data:{};

                    this.featuresAccess = nextFeatures;
                    this.featuresAccessData.next(nextFeatures);

                    this.substitute.next(nextFeatures?.features);
                }
            },
            (error) => {
                console.log('Site error ',error);
            }
        );

    }

    conditionalHeader(){
        let headerTitle:any = this.headerService.getTitle();
        switch(headerTitle){
          case "USER_NAME":
            headerTitle = 'Hi, '+(this.username?.value)+'!';
          break;
          case "CLASS":
            headerTitle = this.featuresAccess?.features?.substitute_class;
          break;
          case "CHECKIN":
            let enable_health_check_in= Utils.isempty(this.featuresAccess?.features?.enable_health_check_in);
            headerTitle = this.translate.instant('header'+(enable_health_check_in?'.generalCheckin':'.healthCheckin'))
          break;
        }
    
        return headerTitle;
    }


   // header servive for update page //user/participant-page-track
    setPageTrack(){
        // there is UI render delay
        setTimeout(() => {
   
            let headerTitle = this.conditionalHeader();

            const route = this.router.url;

            headerTitle = (route=='/dashboard' || route=='/')?'Home':headerTitle;

            return this.apiService.post("user/participant-page-track", {"page_name":headerTitle,"route":route}, true).subscribe(
              (response) => {
                  if(response.status==200){
                      //success activity
                  }
              },
              (error) => {
                  console.log('Site error ',error);
              }
            );
        }, 100);
    }

    forceGeneralCheckin(){
        const forceGeneralCheckin = this.featuresAccess?.features?.force_general_checkin;
        const isHealthCheckinEnabled = this.featuresAccess?.features?.enable_health_check_in;
        console.log('>>',forceGeneralCheckin,isHealthCheckinEnabled);
        
        if(!forceGeneralCheckin || isHealthCheckinEnabled){
            return false;
        }

        // if(isHealthCheckinEnabled){
        //     console.log('Hi');
        //     this.router.navigate(['checkin/health-activity/start/force']);
        //     return;
        // }
        
        return this.apiService.get("survey/get-force-general-checkin", {}, true).subscribe(
            (response) => {
                if(response.status=="success"){
                    const generalCheckIn = !Utils.isempty(response?.data?.list)?response?.data?.list[0]:false;
                    if(!Utils.isempty(generalCheckIn)){
                        const courseEpmId =generalCheckIn['course_epm_id']??'';
                        const painMedicationTrackerParticipantId = generalCheckIn['pain_medication_tracker_participant_id']??'';

                        if(!Utils.isempty(painMedicationTrackerParticipantId)){
                            this.router.navigate(['/checkin/force/pain/'+painMedicationTrackerParticipantId]);
                        }else{
                            this.router.navigate(['/checkin/force/general/'+courseEpmId]);
                        }
                    }
                }else{
                    this.router.navigate(['/dashboard']);
                }
            },
            (error) => {
                console.log('Site error ',error);
            }
        );
    }
} 

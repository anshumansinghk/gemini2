import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { MessageHandlerService } from './core/services/message-handler.service';
import { ActivatedRoute, NavigationEnd, Router,NavigationStart,ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators'

import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import { LocaleService } from './core/index';
import { StackCommService } from './core/index';
import { HeaderService } from './header/header.service';
import { AlertService } from './shared/index';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'ss-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gemini';
  loading: boolean = false;
  noTokenValidateRoutes:Array<any> = ['/reset-password','/forgot-password','/create-password','/intro','/auth'];

  constructor(
    private bnIdle: BnNgIdleService,
    private authService: AuthService,
    private localeService: LocaleService,
    private alerter: AlertService,
    public router: Router,
    private messageHandlerService: MessageHandlerService,
    private headerService:HeaderService,
    private location:Location,
    private stackComm: StackCommService){
      this.localeService.initialize();

      // page refresh in production all services reset by this function
      this.pageRefresh();

      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          // handle NavigationEnd event here
          let url = this.router.url;
          this.authService.setSiteData();
          
          if (!this.noTokenValidateRoutes.includes(url) && this.authService.isLogin()) {
            this.authService.checkLogin();
            this.authService.setFeaturesAccessData();
	          this.authService.setPageTrack();
          }
        
          // make it header dynamic
          this.headerService.setRouteHistory(url);
          this.headerService.setHeaderConfig();
          this.headerService.setFooterConfig();
        }
      })
  }

  pageRefresh(){

    if(environment.production){
      this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(event => {
        if (
          event.id === 1 &&
          event.url === event.urlAfterRedirects
        ) {
           this.router.navigate(['dashboard']);
        }
      })
    }
  }
  
  ngOnInit() {

    this.bnIdle.startWatching(1800).subscribe((isTimedOut: boolean) => {
      if (isTimedOut && this.authService.isLogin() == true) {
        this.loading = true;
        this.authService.logout();
        setTimeout(() => {
              this.router.navigate(['/intro']).then(() => {
                this.headerService.setShowHeader(false);
                this.headerService.setShowFooter(false);
                this.alerter.showError("Your session has been expired. Please log in to continue.", true,true,false);
                 setTimeout(() => { this.loading = false;  },1000);
              });
        },1000);
      }
    });

    if (this.authService.isLogin() == true){
      this.messageHandlerService.init();
      if (this.authService.isAuthenticated('3') == true) {
          this.authService.startTokenRefresh();
          this.headerService.setShowHeader(true);
          this.headerService.setShowFooter(true);
          const url = this.location.path();
          if (url.includes('/intro')) {
            this.router.navigate(['dashboard']);
          }
      }else if (this.authService.isAuthenticated('4') == true) {
        this.authService.startTokenRefresh();
        this.headerService.setShowHeader(true,{type:'companion'});
        this.headerService.setShowFooter(false);
        const url = this.location.path();
        if (url.includes('/intro')) {
          this.router.navigate(['companion']);
        }
      }
    }else{
      let url = this.router.url;
      if (!this.noTokenValidateRoutes.includes(url)) {
        this.router.navigate(['intro'])
      }
    }

    setTimeout(() => {
        this.stackComm.maximizeSpace(1310);
    }, 10);


  }
}



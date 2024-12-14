import { Component, OnInit,Input  } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SeValidators, AlertService } from '../shared/index';
import { ConsoleInterface } from "../shared/services/console.service";
import { NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from './header.service';
import { AuthService } from './../core/index';
import Utils from '../core/utils';

@Component({
  selector: 'ss-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loading: boolean = false;

  headerShowFlag: boolean= false;
  username:any;
  site:any;
  accessFeature:any;
  profilePicture:any;
  isOpenMenu:boolean=false;
  @Input() title: string="DASHBOARD";
  headerConfig:any;
  access:any;
  progressCount:number=0;
  rightActionVal:any;

  constructor(
    private alerter: AlertService,
    private seConsole: ConsoleInterface,
    private router: Router,
    private headerService: HeaderService, 
    private authService: AuthService,
    private translate: TranslateService,
    private location: Location
    ) { }

  ngOnInit() {
    this.headerShowFlag = this.headerService.getShowHeader();
    this.authService.getSiteData.subscribe(upSite => { this.site = upSite; });
    this.authService.featuresAccessData.subscribe(upAccess => { this.access = upAccess;});
  }

  ngDoCheck() {

    this.headerShowFlag = this.headerService.getShowHeader(); 
    this.headerConfig = this.headerService.getHeaderConfig();

    this.progressCount = this.headerService.getProgress();
    this.rightActionVal = this.headerService.getActionRightVal();
    
    this.authService.username.subscribe(updatedName => { this.username = updatedName; });
    this.title=this.authService.conditionalHeader();
  }


  Logout(){
    this.loading = true;
    this.authService.logout(); 
      this.router.navigate(['/login']).then(() => {
        this.isOpenMenu=false;
        this.headerService.setShowHeader(false);
        this.headerService.setShowFooter(false);
        this.alerter.showSuccess(this.translate.instant('sideMenu.logoutSuccessfully'), true,true,false);
        setTimeout(() => { this.loading = false;  },1000);
    });

  }
  openMenu(flag:boolean){
  
    this.isOpenMenu=flag
  }

  backArrow(route:string='') {

    console.log('route',route);
    switch(route){
      case '':
        console.log('Empty back call!');
      break;
      case '../':
        route = this.headerService.popRouteHistory();
        this.router.navigate([route]);
      break;
      case 'method':
        this.headerService.setBackMethod();
      break;
      default:
        this.router.navigate([route]);
      break;
    }

     document.getElementById("moveToTab")?.click();
  }

  actionRight(){
    this.headerService.setActionRightMethod();
  }


  logout(){
     this.authService.logout("logoutSuccess");
  }
}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SeValidators, AlertService,ModalService,ConsoleInterface } from '../shared/index';
import { NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { Location } from '@angular/common';

import { HeaderService } from '../header/header.service';
import { FooterService } from './footer.service';
import { SubscriptionLike } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import Utils from '../core/utils';

@Component({
  selector: 'ss-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footerShowFlag: boolean;
  tabActiveFlag: string = 'DASHBOARD';
  courseId: any;

  modalRoute: string[];
  modalCloseSubscription: SubscriptionLike;
  access:any={} 
  footerConfig:any;

  constructor(
    private alerter: AlertService,
    private seConsole: ConsoleInterface,
    private router: Router,
    private modalservice: ModalService,
    private footerService: FooterService,
    private authService: AuthService,
    private headerService: HeaderService,
    private location: Location
    ) {
  }

  ngOnInit() {
    
  }

  // ngAfterViewChecked() {
  //   this.tabActiveFlag = this.footerService.getActiveTab()
  // }
  
  // ngAfterViewInit() {
  //   if (this.authService.isLogin() == true) {
  //     if (this.authService.isAuthenticated() == true) {
  //       this.authService.checkLogin();
  //     }
  //   }
  // }

  ngDoCheck() {
    this.footerShowFlag = this.headerService.getShowFooter();
    this.courseId = localStorage.getItem("courseId");

    this.authService.featuresAccessData.subscribe(upAccess => { this.access = upAccess;});

    this.tabActiveFlag = this.footerService.getActiveTab(); 
    this.footerConfig = this.headerService.getFooterConfig();
  }
  
  setHeader(tab:string,title: string='') {
    this.tabActiveFlag = tab;
    this.footerService.setActiveTab(tab);
    this.headerService.setTitle(!!title?title:tab);
  }


  ngOnDestroy() {
    this.modalCloseSubscription.unsubscribe();
  }


  backArrow(route:string='') {
     (Utils.isempty(route) || route == '../')?this.location.back():this.router.navigate([route]);
  }

}

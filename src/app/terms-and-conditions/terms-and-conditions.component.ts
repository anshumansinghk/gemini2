import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SeValidators, AlertService } from '../shared/index';
import { ConsoleInterface } from "../shared/services/console.service";
import { NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import * as moment from 'moment';
import { TermsAndConditionsService } from './terms-and-conditions.service';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'ss-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html'
})
export class TermsAndConditionsComponent implements OnInit {
  loading:boolean = false;
  constructor(
    private alerter: AlertService,
    private seConsole: ConsoleInterface,
    private router: Router,
    private termsAndConditionsService: TermsAndConditionsService,
    private headerService: HeaderService) 
  {
    this.headerService.setTitle('TERMS & CONDITIONS');
    this.headerService.setShowHeader(true);
    this.headerService.setShowFooter(false);
    this.loading = true;
  }

  ngOnInit(): void {
    setTimeout(() =>  this.loading = false , 1000);

   
  }

}

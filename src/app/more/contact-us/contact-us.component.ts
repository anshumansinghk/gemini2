import {  Component, EventEmitter, Input, OnInit , Output  } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, FormArray, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

import { AlertService, SeValidators } from 'src/app/shared/index';
import { ConsoleInterface } from "../../shared/services/console.service";
import { HeaderService } from '../../header/header.service';
import { FooterService } from '../../footer/footer.service';
import { MoreService } from '../services/more.service';

@Component({
  selector: 'ss-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  loading!:boolean;

   // Form variable initialized start
  formErrors!: string[];
  errorFlag:boolean=false;
  contactUsForm!: FormGroup;
  name!: FormControl;
  phone_number!: FormControl;
  email!: FormControl;
  message!: FormControl;
  disableForm:boolean=true;

  formSubmitFlag:boolean = false;
  
  constructor(
    private route: ActivatedRoute, 
    public router: Router,
    private alerter:AlertService,
    private seConsole: ConsoleInterface,
    private headerService: HeaderService,
    private footerService:FooterService,
    private translate: TranslateService,
    private moreService:MoreService

    ) 
  {
    this.headerService.setTitle('CONTACT US');
    this.headerService.setShowHeader(true);
    this.headerService.setShowFooter(true);
    this.footerService.setActiveTab('');
  }

  ngOnInit(): void {

    this.headerService.setShowHeader(true,{'back':'../more'});

    this.name = new FormControl(null, [ Validators.required,Validators.minLength(1), Validators.maxLength(50)]);
    this.phone_number =new FormControl('', [Validators.required,Validators.min(1),SeValidators.number]);
    this.email = new FormControl(null, [Validators.required,Validators.email, Validators.minLength(1), Validators.maxLength(50)]);
    this.message = new FormControl( '',[Validators.required]);


    this.contactUsForm = new FormGroup({
      name : this.name,
      phone_number : this.phone_number,
      email : this.email,
      message : this.message
    });


  }

  contactUs()
  {
      this.formErrors = [];
      var flag=false;
      Object.entries(this.contactUsForm.value).forEach(([key, value]) => {  
          if(value){
              flag=true;
          } 
        })
        if(this.contactUsForm.valid && flag)
        {
          this.loading = true;
          this.errorFlag = false;
          this.moreService.sendContactUsRequest(this.contactUsForm.value).subscribe((result) => {
              if(result.status=="success")
              {
                  this.loading = false;
                  // this.alerter.showSuccess(result.msg, true,true,false);
                  this.contactUsForm.reset();
                  this.formSubmitFlag = true;
                  // this.router.navigate(["/dashboard"]);
              }
              else
              {
                this.loading = false;
                this.alerter.showError(result.msg, true,true,false);
                  
              }
          }, 
          err => {
              this.seConsole.Write(err, true);
              this.formErrors = err.error.modelErrors;
              this.loading = false;
          }
        );
      }else{
        this.loading = false; 
        this.formErrors=[]
        this.errorFlag=true;
        // if(!flag){
        //     this.alerter.showError("Please Select Atleast One Criteria.", true,true,false);
        // }
      }
  }

  GoToDashboard(){
    this.formSubmitFlag = false;
    this.router.navigate(["/dashboard"]);
  }

}

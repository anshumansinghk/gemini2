import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup,FormGroup,FormControl, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SeValidators,AlertService } from '../../shared/index';
import {Location} from '@angular/common'; 

import { AuthService } from './../../core/index';
import { HeaderService } from '../../header/header.service';
import { LoginService } from './login.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'ss-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  formErrors!: string[];
  errorFlag:boolean=false;
  loginForm!: FormGroup;
  username!: FormControl;
  password!: FormControl;
  remember_me!: FormControl;

  loading: boolean = false;
  error: boolean = false;

  showPassword:string = 'password';

  role: string;
  isPause: boolean = false;
  uId: number;

  constructor(  
    private router: Router, 
    private alerter: AlertService,
    private authService:AuthService,
    private location: Location,
    private headerService: HeaderService,
    private loginService: LoginService,
    private translate: TranslateService
    ) {

  }

  ngOnInit() {
    // this.location.replaceState("");
    this.headerService.setShowHeader(true,{type:'transparent','back':'/intro'});
    // this.headerService.setShowFooter(false);
    this.loading = true;
    this.createForm();
  }

  private createForm() {
      this.username = new FormControl( '', [Validators.required ,Validators.pattern("^(.+@.+|[0-9]{10,12})$"), Validators.minLength(1), Validators.maxLength(255)]);

      this.password = new FormControl( '', [Validators.required] );
      this.remember_me = new FormControl(false,[]);

      this.loginForm = new FormGroup( {
        username: this.username,
        password: this.password,
        remember_me: this.remember_me
      } );
      
    this.loading = false;
    this.checkCookie(); 
  }

  login( formValues: { username: string; password: string; remember_me: boolean;} ) 
  {
     
      this.formErrors = [];
      var flag=false;
      Object.entries(this.loginForm.value).forEach(([key, value]) => {  
        if(value){
            flag=true;
        } })
      if(this.loginForm.valid && flag){
        this.loading = true;
        if (this.remember_me.value) {
          this.setCookie("username", "password", 365);
        } else {
          this.setCookie("username", "password", -1);
        }
        
        this.authService.login( {"username":formValues.username, "password":encodeURIComponent(formValues.password)})
            .subscribe(
                response =>  {
                  if(response.status=="success"){
                    this.role = response.user_type;
                    if (this.role === "3"){
                      this.loading = false;
                      // localStorage.clear();
                      localStorage.setItem("token", response.token);
                      localStorage.setItem("login_count", response.login_count);
                      localStorage.setItem("role", response.user_type);
                      localStorage.setItem("name", response.name);

                      this.headerService.setShowHeader(true);
                      this.headerService.setShowFooter(true);

                      this.alerter.showSuccess(response.msg, true,true,false);
                      return this.router.navigate(['dashboard']);

                    }else if (this.role === "4"){
                      this.loading = false;
                      localStorage.setItem("token", response.token);
                      localStorage.setItem("login_count", response.login_count);
                      localStorage.setItem("role", response.user_type);
                      localStorage.setItem("name", response.name);

                      this.headerService.setShowHeader(true);
                      this.headerService.setShowFooter(false);

                      this.alerter.showSuccess(response.msg, true,true,false);
                      return this.router.navigate(['companion']);

                    }else{
                      this.loginForm.reset();
                      this.loading = false;                       
                      this.headerService.setShowHeader(false);
                      this.alerter.showError(response.msg, true,true,false);
                    }
                  }else{
                    this.loading = false;
                    this.headerService.setShowHeader(true,{type:'transparent','back':'/intro'});
                    this.headerService.setShowFooter(false);
                    this.alerter.showError(response.msg, true,true,false);
                  }
              },
              error => {
                  this.loginForm.reset();
                  this.error = true;
                  this.loading = false;
                  setTimeout(() => this.error = false, 10000);

              }

            );
          }
  }

  onShowPassword(e:any)
  {
    if (e.target.checked) {
      this.showPassword = 'text';
    }else{
      this.showPassword = 'password';
    }
  }
  
  setCookie(username:string, password:string, exdays:number) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    
    // this.payGroupId.setValue(this.packageDetailData.payGroupId);
    // this.payGroupId.value

    document.cookie =
      username +
      "=" +
      this.username.value +
      ";" +
      expires +
      ";path=/";
    document.cookie =
      password +
      "=" +
      this.password.value +
      ";" +
      expires +
      ";path=/";
  }

  getCookie(cname:string) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  checkCookie() {
    let username = this.getCookie("username");
    let password = this.getCookie("password");
    if (username != "") {
      this.username.setValue(username);
      this.password.setValue(password);
      this.remember_me.setValue(true);
    } else {
      if (username != "" && username != null) {
        this.setCookie("username", "password", 365);
      }
    }
  }

  
  // sendReactivateMail() 
  // {
  //   this.loginService.sendReactivateMail({ uid: this.uId })
  //     .subscribe(
  //       response =>  { },
  //       error => { }
  //     );
  // }

}

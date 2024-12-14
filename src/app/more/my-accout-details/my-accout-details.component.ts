import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from 'src/app/header/header.service';
import { SeValidators } from 'src/app/shared';
import { ConsoleInterface } from 'src/app/shared/services/console.service';
import { MoreService } from '../services/more.service';
import { Router } from '@angular/router';
import { UserDetailsData } from '../model/more';

@Component({
  selector: 'ss-my-accout-details',
  templateUrl: './my-accout-details.component.html',
  styleUrls: ['./my-accout-details.component.scss']
})
export class MyAccoutDetailsComponent {
  loading!:boolean;
  formErrors!: string[];
  errorFlag:boolean=false;
  myAccoutForm!: FormGroup;
  first_name!: FormControl;
  last_name!: FormControl;
  email!: FormControl;
  current_password!: FormControl;
  new_password!: FormControl;
  con_password!: FormControl;


  userData:UserDetailsData = history.state;

  constructor(private headerService:HeaderService,
    private seConsole: ConsoleInterface,
		private formBuilder: FormBuilder, 
    private moreService: MoreService,
    private route:Router
  ){
    this.headerService.setTitle("EDIT MY INFO");
  }

  ngOnInit(){

    this.headerService.setShowHeader(true,{'back':'../'});
    this.first_name = new FormControl(this.userData.first_name, [ Validators.required,Validators.minLength(1), Validators.maxLength(50)]);
    this.last_name = new FormControl(this.userData.last_name, [Validators.required,Validators.min(1)]);
    this.email = new FormControl(this.userData.email, [Validators.required,Validators.email, Validators.minLength(1), Validators.maxLength(50)]);
    this.current_password = new FormControl('',[Validators.required]);
    this.new_password = new FormControl('',Validators.minLength(8));
    this.con_password = new FormControl('');

  
    this.myAccoutForm = this.formBuilder.group(
      {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        current_password: this.current_password,
        new_password: this.new_password,
        con_password: this.con_password,
      },
      {
        validator: this.match_password,
      }
    );

  }
	
	match_password(g: FormGroup) {
		return (g as any).get('new_password').value === (g as any).get('con_password').value ? null : { match_password: true };
	}

  saveMyAccount(){
    
    this.formErrors = [];
    var flag=false;

    Object.entries(this.myAccoutForm.value).forEach(([key, value]) => {  
      if(value){
        flag=true;
      } 
    })

    if(this.myAccoutForm.valid && flag)
    {
      this.loading = true;
      this.errorFlag = false;
      const formValues = this.myAccoutForm.value;

      const updatedSubmitData = {
        username: this.userData.username || "", 
        email: formValues.email || "",
        current_password: formValues.current_password || "",
        password: formValues.new_password || "",
        confirm_password: formValues.con_password || "",
        first_name: formValues.first_name || "",
        last_name: formValues.last_name || "",
        zip_code: this.userData.zip_code || "", 
        phone_number: this.userData.phone_number || "", 
        timezone: this.userData.timezone || "",
        current_image_name: '',
        profile_picture: {
          filename: '',
          filetype: "image/jpeg",
          value: "",
        },
      };

      this.moreService.submitMyAccount(updatedSubmitData).subscribe(
        response=>{
          this.loading = false; 
          if(response['status_code'] == 200){
            this.route.navigate(['/more']);
          }
        },
        error=>{}
      );

    }else{
      this.loading = false; 
      this.formErrors=[]
      this.errorFlag=true;
    }

  }
}

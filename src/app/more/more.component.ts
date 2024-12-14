import { Component } from '@angular/core';
import { MoreService } from './services/more.service';
import { AuthService } from '../core';
import { HeaderService } from '../header/header.service';
import { Router } from '@angular/router';
import { UserDetailsData } from './model/more';

@Component({
  selector: 'ss-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent {

  userDetails:UserDetailsData;
  
  constructor(  
    private moreService:MoreService,private authService:AuthService,private headerService:HeaderService,private route:Router
  ) {

    this.headerService.setTitle('More');
    this.getUserDetails();
  }

  getUserDetails(){
    this.moreService.getUserDetails({}).subscribe(
      response => {
        this.userDetails = response.data;
      },
      error => {}
    )
  }

  public logout(){
     this.authService.logout("logoutSuccess");
        // this.headerService.setShowHeader(false);
        // this.headerService.setShowFooter(false);
        // this.alerter.showSuccess('Logout Successfully', true,true,false);
        // this.router.navigate(['login']);
  }

  openTearmConditions(){
    this.route.navigate(['/more/my-accout-details'],{
      state:this.userDetails
    });
  }
}

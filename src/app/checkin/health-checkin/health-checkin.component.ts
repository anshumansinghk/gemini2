import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HeaderService } from '../../header/header.service';
import { FooterService } from '../../footer/footer.service';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'ss-health-checkin',
  templateUrl: './health-checkin.component.html',
  styleUrls: ['./health-checkin.component.scss']
})
export class HealthCheckinComponent {

   constructor(  
      private router: Router,
      private authService: AuthService,
      private route:ActivatedRoute,
      private footerService: FooterService,
      private headerService: HeaderService
    ) {

    }

   ngOnInit() {
      this.headerService.setShowHeader(true,{'back':'/dashboard'});
      this.headerService.setShowFooter(true,{'type':'close','back':'/dashboard'});
   }

}

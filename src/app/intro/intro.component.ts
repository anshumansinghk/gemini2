import { Component } from '@angular/core';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'ss-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {
    public site:any={};

    constructor(
        private headerService: HeaderService,
    ) {
    }

    ngOnInit() {
      this.headerService.setShowHeader(true,{type:'darkMode','back':'/intro'});
    }
}

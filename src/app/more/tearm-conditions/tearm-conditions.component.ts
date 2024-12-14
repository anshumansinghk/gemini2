import { Component } from '@angular/core';
import { HeaderService } from 'src/app/header/header.service';


@Component({
  selector: 'ss-tearm-conditions',
  templateUrl: './tearm-conditions.component.html',
  styleUrls: ['./tearm-conditions.component.scss']
})
export class TearmConditionsComponent {

  constructor(private headerService:HeaderService){
    this.headerService.setTitle('TEARM & CONDITIONS');
  }

  ngOnInit(){
    this.headerService.setShowHeader(true,{'back':'../'});
  }

}

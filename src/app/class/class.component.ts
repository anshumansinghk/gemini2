import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from './services/class.service';
import { Classes } from './models/class';
import { AuthService } from '../core';
import { PluralService } from '../shared';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'ss-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent {
  classList:Array<Classes>;
  classAction:any={'review':'Review ','complete':'Complete ','lock':'','unlock':'Look '};
  loading: boolean = true;
  featureAccess:any;

  constructor(
    private classService:ClassService,
    private route:Router,
    private authService: AuthService,
    private headerService: HeaderService,
    private pluralService: PluralService,
  ) {}
  
  ngOnInit(){
    this.authService.featuresAccessData.subscribe(upAccess => { this.featureAccess = upAccess;});
    const substituteClass = this.pluralService.pluralize( this.featureAccess?.features?.substitute_class ?? 'class' );
    this.headerService.setTitle(substituteClass);
    this.getClassList();
  }

  getClassList(){
    this.classService.getClassList({}).subscribe(
      response =>  { 
        if(response.status_code == 200){
          this.classList = response?.data.classes;
        }
        this.loading=false;
      },
      error => { this.loading=false; }
    )
    
  }

  progressPercent(per:any){
    return +per;
  }

}

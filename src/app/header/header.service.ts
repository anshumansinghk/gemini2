import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject ,Subject } from "rxjs";
import { Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './../core/index';
import Utils from '../core/utils';

@Injectable({
    providedIn: 'root',
})

@Injectable()  
export class HeaderService {  

  public headerShowFlag :boolean;
  public footerShowFlag :boolean;
  public no_access :boolean;
  public headerTitle:string="DASHBOARD";

  public back:any=false;
  public type:string='default';
  public footer:any;
  public progressCount:number;
  public rightActionVal:{title:string,class:string};

  // Observable for back activity
  public isBackMethod:boolean=false;
  public backMethod = new Subject<any>();
  public callBackMethod = this.backMethod.asObservable();

   // Observable for action left
  public actionRightMethod = new Subject<any>();
  public callActionRight = this.actionRightMethod.asObservable();

  // stop mutiple trigger
  private routeHisotry:Array<string> = [];

  constructor(
    private router: Router,
    ) {
  }

  setShowHeader(value:boolean,config:any=null){
    this.setHeaderConfig(config);
    this.headerShowFlag = value;  
  }

  getShowHeader(){  
    return this.headerShowFlag;  
  } 

  setShowFooter(value:boolean,config:any=null){
    this.setFooterConfig(config);
    this.footerShowFlag = value;  
  }

  getShowFooter() {  
    return this.footerShowFlag;  
  } 


  setTitle(value:string){
    this.headerTitle=value;
  }

  getTitle(){
    return this.headerTitle;  
  }

  setBack(value:string){
    this.back = value;
  }

  getBack(){
    return this.back;  
  }

  setHeaderConfig(config:any=null){
    this.type = config?.type??'default';
    this.back = config?.back??false;
    this.progressCount = config?.progressCount??0;
  }

  getHeaderConfig(){
    return {...this};
  }

  setFooterConfig(config:any=null){
    let type = config?.type??'default';
    let back = config?.back??false;

    this.footer = {type:type,back:back};
  }

  getFooterConfig(){
    return {...this.footer};
  }

  setBackMethod() {
    this.backMethod.next();
  } 

  setActionRightMethod() {
    this.actionRightMethod.next();
  }

  setActionRightVal(val:{title:string,class:string}) {
    this.rightActionVal=val;
  }

  getActionRightVal(){
    return this.rightActionVal;
  }

  getProgress(){
    return this.progressCount;
  }

  setProgress(value:number){
    this.progressCount=value;
  }

  setRouteHistory(route:string){
    this.routeHisotry.push(route);
  }
  
  popRouteHistory(){
    // remove current route
    this.routeHisotry.pop()??null;
    // this is previous route
    let preRoute = this.routeHisotry.pop()??'/';
    return preRoute;
  }
} 
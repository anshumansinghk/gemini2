import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from '../core/services/api.service';
import { PageDataResponse } from '../core/models';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  public activeTab:string="DASHBOARD";

  constructor(private apiService: ApiService){}

  setActiveTab(value:string){
    this.activeTab=value;
  }
  
  getActiveTab(){
    return this.activeTab;
  }
}

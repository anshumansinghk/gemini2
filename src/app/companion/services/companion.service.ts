import { Injectable, isDevMode } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../../core/services/api.service";
import { CompanionDashboardData, UserDetails } from "../models/companion";

@Injectable({
    providedIn: "root",
})
export class CompanionService {

    constructor(private apiService: ApiService) {} 

    getUserDetails(data:{}):Observable<UserDetails>{
        return this.apiService.post(`user/user-detail`, data, true);
    }
    
    getCompanionDashboardDetails():Observable<CompanionDashboardData>{
        return this.apiService.get(`user/companion-dashboard`, {},true);
    }
}

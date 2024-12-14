import { Injectable, isDevMode } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../../core/services/api.service";
import { ContactUsMessage, ContactUsRes, IContactUsRequest, IContactUsResponse, SaveUserProfile, SaveUserProfileRes, UserDetails } from "../model/more";


@Injectable({
    providedIn: "root",
})
export class MoreService {

    constructor(private apiService: ApiService) {} 

    getUserDetails(data:{}):Observable<UserDetails>{
        return this.apiService.post(
			"/user/user-detail",
			data,
			true
		);
    }

    submitContactUs(data:ContactUsMessage):Observable<ContactUsRes>{
        return this.apiService.post(
			"/auth/contact-us",
			data,
			true
		);
    }

    sendContactUsRequest(reqBody:IContactUsRequest):Observable<IContactUsResponse>{
        return this.apiService.post<IContactUsResponse>(`auth/contact-us`, reqBody, true);
    }
    
    submitMyAccount(data:SaveUserProfile):Observable<SaveUserProfileRes>{
        return this.apiService.post(`auth/profile`, data, true);
    }
}

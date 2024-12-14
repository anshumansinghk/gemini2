

import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from '../../core/services/api.service';
import { IContactUsRequest, IContactUsResponse } from './contact-us.model';


@Injectable({
    providedIn: 'root',
})


export class ContactUsService{
    constructor(private apiService: ApiService){}

    sendContactUsRequest(reqBody:IContactUsRequest):Observable<IContactUsResponse>{
        return this.apiService.post<IContactUsResponse>(`auth/contact-us`, reqBody, true);
    }

}

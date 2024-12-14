

import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from '../core/services/api.service';


@Injectable({
    providedIn: 'root',
})


export class TermsAndConditionsService{
    constructor(private apiService: ApiService){}

}

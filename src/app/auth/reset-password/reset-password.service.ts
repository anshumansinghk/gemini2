

import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from '../core/services/api.service';


@Injectable({
    providedIn: 'root',
})


export class ResetPasswordService{
    constructor(private apiService: ApiService){}


}

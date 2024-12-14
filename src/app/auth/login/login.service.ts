import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from '../../core/services/api.service';

//model
import { sendReactivateMailRequest } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private apiService: ApiService){}

}

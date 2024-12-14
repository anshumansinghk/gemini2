import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core';
import { GetMessageResponse } from '../models/dashboard.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiService: ApiService) { }

  getDashBoardData(data:{}): Observable<GetMessageResponse> {
    return this.apiService.get(
        "user/participant-dashboard",
        data
    );
  }
}

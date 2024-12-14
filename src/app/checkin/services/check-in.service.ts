import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from '../../core/services/api.service';
import { SubmitCheckInDetails, SubmitCheckInResponse } from '../models/health-checkin';
import { 
    PlayGetGeneralCheckin,
    PreGetGeneralList,
    PlayNextGeneralCheckin,
    PlayGetPainMedication,
    PlayNextPainMedication
} from "../models/general-checkin";


@Injectable({
  providedIn: 'root'
})
export class CheckInService {
  constructor(private apiService: ApiService){}



  submitCheckIn(data:SubmitCheckInDetails): Observable<SubmitCheckInResponse> {
    return this.apiService.post(
        "user/daily-checkin",
        data,
        true
    );
  }

  getGeneralCheckin(reqBody:PlayGetGeneralCheckin):Observable<any>{
        return this.apiService
            .post("survey/acronym-questionnaire", reqBody, true);
  }

  getPainMedicaion(reqBody:PlayGetPainMedication):Observable<any>{
    return this.apiService
        .post("survey/get-pain-medication-tracker-question", reqBody, true);
  }
  
  nextQuestionnaire(reqBody:PlayNextGeneralCheckin):Observable<any>{
      return this.apiService
          .post("survey/next-acronym-questionnaire", reqBody, true);
  }

  nextPainMedicaion(reqBody:PlayNextPainMedication):Observable<any>{
    return this.apiService
        .post("survey/save-pain-medication-tracker-response", reqBody, true);
	}

  getGenearalList():Observable<PreGetGeneralList>{

      return this.apiService
          .get("survey/get-general-checkin", {}, true);
  }
}

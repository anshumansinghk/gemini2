import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core';
import {WrittenPracticeResponse,WrittenPracticePaylaod,QuestionDetailResponse} from '../models/writtenpracticemodel'
@Injectable({
  providedIn: 'root'
})
export class WrittenpracticeService {
  constructor(private apiService:ApiService) { }

  getWrittenPractice(reqBody:WrittenPracticePaylaod): Observable<WrittenPracticeResponse> {
    return this.apiService
      .post("course/get-written-practice", reqBody, true);
  }
  getWrittenPracticeQuestion(reqBody:any): Observable<QuestionDetailResponse> {
    return this.apiService
      .post("course/get-written-practice-question", reqBody, true);
  }
  saveClass(reqBody:any): Observable<any> {
    
    return this.apiService
      .post("course/save-class-written-practice", reqBody, true);
  }
}

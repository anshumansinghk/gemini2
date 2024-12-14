import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core';
import { currentClassProgressResponce, classDetailPaylaod, classDetailResponse, topicListResponse,getTopicListdataPaylaod,topicDetailPagePaylaod,topicDetailPage } from '../models/progress.model'
@Injectable({
  providedIn: 'root'
})
export class ProgressserviceService {

  constructor(private apiService: ApiService) { }

  currentClassProgress(): Observable<currentClassProgressResponce> {
    return this.apiService.get<string>(
      "/course/current-class-progress"
    );
  }
  classDetail(reqBody: classDetailPaylaod): Observable<classDetailResponse> {
    return this.apiService
      .post("course/class-detail", reqBody, true);
  }
  getTopicListdata(reqBody:any): Observable<topicListResponse> {
    return this.apiService
      .post("course/topic-list", reqBody, true);
  }


  topicDetailPage(reqBody: topicDetailPagePaylaod): Observable<topicDetailPage> {
    return this.apiService
      .post("course/topic-detail", reqBody, true);
  }
}

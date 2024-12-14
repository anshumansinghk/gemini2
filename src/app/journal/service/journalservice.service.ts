import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core';
import { PostTopicResponse, PostTopicPayload,JournalPostsResponse ,topicDetailPayload} from '../models/journal-models'

@Injectable({
  providedIn: 'root'
})
export class JournalserviceService {
  constructor(private apiService: ApiService) { }


  getJournalPostTopics(reqBody: PostTopicPayload): Observable<PostTopicResponse> {
    return this.apiService
      .post("post/journal-post-topics", reqBody, true);
  }
  getTopicDetail(reqBody: topicDetailPayload): Observable<JournalPostsResponse> {
    return this.apiService
      .post("post/journal-posts", reqBody, true);
  }
}

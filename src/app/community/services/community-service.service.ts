import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { discussionTopics, PostReplyResponse,AddPost,AddPostApiResponse,postLike,deletePost,getPostReply,postTopic,deletePostResponce,postLikeResponce } from "src/app/community/models/community.model";
import { ApiService } from 'src/app/core';
import { post } from "src/app/community/models/community.model";
@Injectable({
  providedIn: 'root'
})
export class CommunityServiceService {

  constructor(private apiService: ApiService) { }

  getDiscussionTopics(): Observable<discussionTopics> {
    return this.apiService.get<string>(
      "/post/discussion-topics/"
    );
  }
  getPostTopic(reqBody: postTopic): Observable<post> {
    return this.apiService
      .post("post/posts", reqBody, true);
  }
  getPostReply(reqBody: getPostReply): Observable<PostReplyResponse> {
    return this.apiService
      .post("post/post-and-reply", reqBody, true);
  }
  addPost(reqBody: AddPost): Observable<AddPostApiResponse> {
    return this.apiService
      .post("/post/add-post", reqBody, true);
  }
  deletePost(reqBody: deletePost): Observable<deletePostResponce> {
    return this.apiService
      .post("post/delete-post", reqBody, true);
  }
  postLike(reqBody: postLike): Observable<postLikeResponce> {
    return this.apiService
      .post("post/post-like", reqBody, true);
  }
}

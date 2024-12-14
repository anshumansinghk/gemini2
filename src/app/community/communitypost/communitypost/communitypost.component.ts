import { Component } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/header/header.service';
import { CommunityServiceService } from '../../services/community-service.service';
import { discussionPostDetails } from '../../models/community.model';
import { discussionPostTopicsDetails } from '../../models/community.model';
import { AlertService, SeValidators } from 'src/app/shared/index';
import { Subscription } from "rxjs";

@Component({
  selector: 'ss-communitypost',
  templateUrl: './communitypost.component.html',
  styleUrls: ['./communitypost.component.scss']
})
export class CommunitypostComponent {
  postTopicdata: discussionPostTopicsDetails;
  postdata: discussionPostDetails[];
  id: string;
  title: string;
  loading: boolean = false
  headerBackRef !:Subscription;

  constructor(private communityServiceService: CommunityServiceService, private headerService: HeaderService, public router: Router, private route: ActivatedRoute, private alert: AlertService) {
  }
  ngOnInit() {
    this.headerService.setShowFooter(true)
    this.headerService.setBack('method');
    this.headerBackRef =
    this.headerService.callBackMethod.subscribe(() => {
      this.backStep();
    });
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      this.title = params.title
      this.getPostTopic(params.id, params.itemTitle)
    });
  }
  backStep() {
    this.router.navigate(['dashboard'])
  }
  getPostTopic(id: string, itemTitle: string) {
    this.loading = true;
    this.communityServiceService.getPostTopic({ "post_topic_id": id }).subscribe(
      result => {
        this.postTopicdata = result.data.post_topic
        this.postdata = result.data.posts
        this.headerService.setTitle(this.postTopicdata?.title);
        this.loading = false
      },
    );
  }

  replyPage(postId: string) {
    let params = { 'postId': postId,'topicId': this.id, 'title': this.title, }
    let Route = 'community/postreply';
    this.router.navigate([Route], { queryParams: params });
  }


  addthoughtpage(topicId: string, title: string) {
    let params = { 'topicId': topicId, 'title': title, 'id': this.id, 'pageTitle': this.title }
    let Route = 'community/createpost';
    this.router.navigate([Route], { queryParams: params });
  }

  editPost(id: string, postTitle: string) {
    let params = { 'editPostId': id, 'itemTitle': postTitle,'id': this.id, 'pageTitle': this.title }
    let Route = 'community/createpost';
    this.router.navigate([Route], { queryParams: params });
  }

  deletePost(postId: string) {
    this.loading = true;
    this.communityServiceService.deletePost({ "post_id": postId }).subscribe(
      result => {
        if (result.status == "success") {
          let params = { 'id': this.id, 'itemTitle': this.title }
          let Route = 'community/communitypost';
          this.router.navigate([Route], { queryParams: params });
          this.alert.showSuccess(result.msg, true, true, false);
          this.loading = false
        }
        else {
          this.alert.showError(result.msg, true, true, false);
          this.loading = false

        }
      },
    );

  }

  likeUnlike(likeType: string, postId: string) {
    this.loading = true;
    this.communityServiceService.postLike({ "post_id": postId }).subscribe(
      result => {
        if (result.status == "success") {
          this.getPostTopic(this.id, this.title)
          this.alert.showSuccess(result.msg, true, true, false);
          this.loading = false
        }
        else {
          this.alert.showError(result.msg, true, true, false);
          this.loading = false
        }
      },
    );
  }

  ngOnDestroy() {
    this.headerBackRef.unsubscribe();
  }
}

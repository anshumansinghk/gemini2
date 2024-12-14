import { Component } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/header/header.service';
import { CommunityServiceService } from '../../services/community-service.service';
import { PostTopic, replyPost, PostReplyResponse, Reply, AddPost } from '../../models/community.model';
import { AlertService, SeValidators } from 'src/app/shared/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from "rxjs";

@Component({
  selector: 'ss-postreply',
  templateUrl: './postreply.component.html',
  styleUrls: ['./postreply.component.scss']
})
export class PostreplyComponent {
  result: PostReplyResponse
  postReplyData: replyPost
  reply: Reply[]
  gpostId: string
  replyForm: FormGroup;
  loading: boolean = false
  topicId: string | number;
  itemTitle: string;
  replyToreplyFlag: boolean = false;
  viewMoreReplyFlag: boolean = false
  currentPostId: string | number;
  headerBackRef !:Subscription;

  constructor(private CommunityServiceService: CommunityServiceService, private HeaderService: HeaderService, public router: Router, private route: ActivatedRoute, private alert: AlertService, private fb: FormBuilder) {
    this.replyForm = this.fb.group({
      reply: ['', Validators.required], // Form control for the reply input
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.replyPostData(params.postId)
      this.gpostId = params.postId
      this.topicId = params.topicId
      this.itemTitle = params.itemTitle
    });
    this.HeaderService.setBack('method');
    this.headerBackRef =
    this.HeaderService.callBackMethod.subscribe(() => {
      this.backStep();
    });
  }
  backStep() {
    let params = { 'id': this.topicId, 'itemTitle': this.itemTitle }
    let Route = 'community/communitypost';
    this.router.navigate([Route], { queryParams: params });
  }
  replyPostData(postId: string) {
    this.loading = true;
    this.CommunityServiceService.getPostReply({ "post_id": postId }).subscribe(
      result => {
        this.result = result
        if (result.data?.post != undefined) {
          this.postReplyData = result.data?.post

          if (result.data.post.reply != undefined) {
            this.reply = result.data.post.reply
            
          }
        }
        this.loading = false
      },
    );
  }


  replyPost(replyId: string, evn: HTMLInputElement) {
    if (evn.value.length > 0) {
      const payload: AddPost = {
        title: "reply title",
        text: evn.value,
        class_id: null,
        type: "community",
        post_topic_default_id: "",
        replied_post_id: replyId,
        post_id: null,
        current_image_name: null,
        image: {
          filename: null,
          filetype: '',
          value: null
        }
      };
      evn.value = '';
      this.addPost(payload)
    }
  }
  addPost(payload: AddPost) {
    this.loading = true;
    this.CommunityServiceService.addPost(payload).subscribe(
      result => {
        if (result.status == "success") {
          this.replyPostData(this.gpostId)
          this.replyToreplyFlag = false
          this.alert.showSuccess(result.msg, true, true, false);
        }
        else {
          this.alert.showError(result.msg, true, true, false);

        }
        this.loading = false
      },
    );
  }


  likeUnlike(likeType: string, postId: string) {
    this.loading = true;
    this.CommunityServiceService.postLike({ "post_id": postId }).subscribe(
      result => {
        if (result.status == "success") {
          this.replyPostData(this.gpostId)
          this.alert.showSuccess(result.msg, true, true, false);
        }
        else {
          this.alert.showError(result.msg, true, true, false);
        }
        this.loading = false
      },
    );
  }


  replyToreply(type: string | null, postId: string | number) {
    this.currentPostId = postId
    if (type == 'viewmorereply') {
      this.viewMoreReplyFlag = !this.viewMoreReplyFlag
    }
    else {
      this.replyToreplyFlag = !this.replyToreplyFlag
    }
  }

  ngOnDestroy() {
    this.headerBackRef.unsubscribe();
  }
}

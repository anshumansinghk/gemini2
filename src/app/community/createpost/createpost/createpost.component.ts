import { Component } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/header/header.service';
import { CommunityServiceService } from '../../services/community-service.service';
import { discussionPostDetails } from '../../models/community.model';
import { discussionPostTopicsDetails } from '../../models/community.model';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { discussionTopics, PostReplyResponse, AddPost, AddPostData, replyPost, Reply } from "src/app/community/models/community.model";
import { AlertService, SeValidators } from 'src/app/shared/index';
import { Subscription } from "rxjs";


@Component({
  selector: 'ss-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent {
  topicId: string
  topicTitle: string
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  base64File: string | null = null;
  isPostDetailPage: boolean = false
  fileType: any;
  addPostResponseData: AddPostData
  postReplyData: replyPost;
  reply: Reply[];
  PostId: string
  postTitle: string
  imagePreview: string;
  isEditPage: boolean = false;
  loading: boolean = false
  isOnlySpace:boolean=false
  headerBackRef !:Subscription;

  constructor(private CommunityServiceService: CommunityServiceService, private HeaderService: HeaderService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient, private alert: AlertService) {
    this.uploadForm = this.fb.group({
      file: [null,],
      title: [null, Validators.required],
      text: [null],
    });
  }
  ngOnInit() {
    this.HeaderService.setShowFooter(false)
    this.HeaderService.setTitle('Add your thoughts');
    this.route.queryParams.subscribe(params => {
      this.topicId = params.topicId;
      this.topicTitle = params.topicTitle
      this.PostId = params.id
      this.postTitle = params.title
      if (params.editPostId != undefined) {
        this.replyPostData(params.editPostId)
        this.isEditPage = true;
        this.topicId = params.editPostId
        this.HeaderService.setTitle(params.postTitle);
      }

    });
    this.HeaderService.setBack('method');
    this. headerBackRef =
    this.HeaderService.callBackMethod.subscribe(() => {
      this.backStep();
    });
  }
  backStep() {
    let params = { 'id': this.PostId, 'itemTitle': this.postTitle }
    let Route = 'community/communitypost';
    this.router.navigate([Route], { queryParams: params });

  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileType = this.selectedFile.type;
      const reader = new FileReader();
      reader.onload = () => {
        this.base64File = (reader.result as string).split(',')[1];
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  onKeyPress(evn:KeyboardEvent){
    const inputValue = (evn.target as HTMLInputElement).value;
    var numOfSpaces = inputValue.split(" ").length - 1;
    if (inputValue.length != numOfSpaces) {
      this.isOnlySpace=false
    }
  }
  onSubmit(): void {
    var numOfSpaces = this.uploadForm.value.title.split(" ").length - 1;
    if (this.uploadForm.value.title.length == numOfSpaces) {
      this.isOnlySpace=true
      return
    }
    else{
      this.isOnlySpace=false
    }
    if (this.uploadForm.valid) {
      const payload: AddPost = {
        title: this.uploadForm.value.title,
        text: this.uploadForm.value.text,
        class_id: null,
        type: "community",
        post_topic_default_id: this.topicId,
        replied_post_id: null,
        post_id: null,
        current_image_name: this.selectedFile?.name || null,
        image: {
          filename: this.selectedFile?.name || null,
          filetype: this.fileType,
          value: this.base64File || null
        }
      };
      if (this.isEditPage && payload.image.value == null) {
        payload.image.value = this.postReplyData.image
        payload.post_id = this.topicId
        payload.post_topic_default_id = null
      }
      else if (this.isEditPage && payload.image.value) {
        payload.post_id = this.topicId
        payload.post_topic_default_id = null
      }
      this.addPost(payload)
    }
  }


  onCancel() {
    this.uploadForm.reset();
    this.selectedFile = null;
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }


  addPost(payload: AddPost) {
    this.loading = true
    this.CommunityServiceService.addPost(payload).subscribe(
      result => {
        if (result.status == "success") {
          this.addPostResponseData = result.data
          if (payload.post_id && this.isEditPage) {
            this.replyPostData(payload.post_id)
          }
          else {
            this.replyPostData(result.data.post_id)
          }
          this.isPostDetailPage = true;
          this.alert.showSuccess(result.msg, true, true, false);
          this.loading = false
        }
        else {
          this.alert.showError(result.msg, true, true, false);
          this.loading = false
        }
        this.backStep()
      },
    );
  }
  replyPostData(postId: string | number) {
    this.loading = true
    this.CommunityServiceService.getPostReply({ "post_id": postId }).subscribe(
      result => {
        if (result.data?.post != undefined) {
          this.postReplyData = result.data?.post
          if (result.data.post.reply != undefined) {
            this.reply = result.data.post.reply
            this.editPost(postId)
            this.loading = false
          }

        }
      },
    );
  }


  deletePost(postId: string) {
    this.loading = true
    this.CommunityServiceService.deletePost({ "post_id": postId }).subscribe(
      result => {
        if (result.status == "success") {
          let params = { 'id': this.PostId, 'itemTitle': this.postTitle }
          let Route = 'community/communitypost';
          this.router.navigate([Route], { queryParams: params, });
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

  editPost(postId: string | number) {
    this.loading = true
    this.isPostDetailPage = false
    this.uploadForm.patchValue({
      title: this.postReplyData.title,
      text: this.postReplyData.text,
    });
    this.imagePreview = this.postReplyData.image
    this.loading = false

  }

  ngOnDestroy() {
    this.headerBackRef.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared';
import { HeaderService } from 'src/app/header/header.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { JournalserviceService } from '../service/journalservice.service';
import { PostTopicResponse, PostTopicPayload, PostTopicData, PostTopic, JournalPostsData, Post } from '../models/journal-models'
import { CommunityServiceService } from 'src/app/community/services/community-service.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'ss-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent {
  JournalPostTopicsResult: PostTopicResponse
  postTopicsResult: PostTopic[]
  topicDetailPost: Post[]
  topicDetailPostTopic: PostTopic
  isJournalPostViewPagedata: any
  stepOne: boolean = true
  stepTwo: boolean = false
  stepThree: boolean = false
  stepFour: boolean = false
  uploadForm: FormGroup;
  imagePreview: string;
  selectedFile: File;
  fileType: string;
  base64File: string;
  stepFive: boolean;
  stepSix: boolean;
  loading: boolean = false
  isEditEntry: boolean;
  journalEntryType: string = "Create a Journal entry";
  isOnlySpace:boolean=false
  headerBackRef !:Subscription;

  constructor(private CommunityServiceService: CommunityServiceService, private JournalserviceService: JournalserviceService, public router: Router, private route: ActivatedRoute, private alert: AlertService, private HeaderService: HeaderService, private fb: FormBuilder,) {
    this.uploadForm = this.fb.group({
      file: [null,],
      title: [null, Validators.required],
      text: [null],
    });
  }

  ngOnInit() {
    this.HeaderService.setBack('method');
    this.headerBackRef =
    this.HeaderService.callBackMethod.subscribe(() => {
      this.backStep();
    });
    this.route.queryParams.subscribe(params => {
      this.journalPostTopics(params.id)
      this.HeaderService.setTitle(params.itemTitle);
    });
  }
  onKeyPress(evn:KeyboardEvent){
    const inputValue = (evn.target as HTMLInputElement).value;
    var numOfSpaces = inputValue.split(" ").length - 1;
    if (inputValue.length != numOfSpaces) {
      this.isOnlySpace=false
    }
  }
  backStep() {
    
    if (this.stepTwo) {
      this.stepOne = true
      this.stepTwo = false
      this.stepSix=false
      this.HeaderService.setShowFooter(true)
    }
    else if (this.stepThree) {
      this.stepThree = false
      this.stepTwo = true
      this.HeaderService.setShowFooter(true)
    }
    else if (this.stepFour) {
      this.stepTwo = true
      this.stepFour = false
      this.HeaderService.setShowFooter(true)
    }
    else if (this.stepFive) {
      this.stepFour = true
      this.stepFive = false
    }
    else if (this.stepSix) {
      this.stepFive = true
      this.stepSix = false
    }
    else if (this.stepOne) {
      this.HeaderService.setBack('../');
      this.router.navigate([this.HeaderService.popRouteHistory()]);
      // this.router.navigate(['/dashboard'])
    }
  }
  journalPostTopics(classId: string) {
    this.loading = true;
    this.JournalserviceService.getJournalPostTopics({ "class_id": classId }).subscribe(
      result => {
        this.JournalPostTopicsResult = result
        this.postTopicsResult = result.data.post_topic
        this.loading = false
      },
    );
  }


  topicDetail(dataId: string) {
    this.loading = true;
    let payload = { "post_id": "", "post_topic_id": dataId, "is_show_posts": true }
    this.JournalserviceService.getTopicDetail(payload).subscribe(
      result => {
        this.topicDetailPost = result.data.posts
        this.topicDetailPostTopic = result.data.post_topic
        this.stepTwo = true
        this.stepOne = false
        this.loading = false

      },
    );
  }



  getTimeDifference(createdAt: string): string {
    const createdDate = new Date(createdAt); // Parse UTC date
    const now = new Date();
    const differenceMs = now.getTime() - createdDate.getTime();
    const seconds = Math.floor(differenceMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      const remainingHours = hours % 24;
      const remainingMinutes = minutes % 60;
      return `${days} day(s) ${remainingHours} hour(s) ${remainingMinutes} minute(s) ago`;
    } else if (hours > 0) {
      const remainingMinutes = minutes % 60;
      return `${hours} hour(s) ${remainingMinutes} minute(s) ago`;
    } else if (minutes > 0) {
      return `${minutes} minute(s) ago`;
    } else {
      return `Just now`;
    }
  }


  journalPost(postData: any) {
    this.isJournalPostViewPagedata = postData
    this.stepTwo = false
    this.stepOne = false
    this.stepThree = true
    this.HeaderService.setShowFooter(false)

  }

  createJournalPage(id: string, type: string = 'null') {
    this.stepOne = false
    this.stepTwo = false
    this.stepThree = false
    this.stepFour = true
    this.HeaderService.setShowFooter(false)
    if (type == 'edit_entry') {
      this.journalEntryType = 'Edit a Journal entry'
      this.isEditEntry = true
      this.uploadForm.patchValue({
        title: this.isJournalPostViewPagedata.title,
        text: this.isJournalPostViewPagedata.text,
      });

      this.imagePreview = this.isJournalPostViewPagedata.image_path
    }
    else {
      this.journalEntryType = 'Create a Journal entry'
      this.uploadForm.reset()
    }

  }
  onSubmit(type: any): void {
    var numOfSpaces = this.uploadForm.value.title.split(" ").length - 1;
    if (this.uploadForm.value.title.length == numOfSpaces) {
      this.isOnlySpace=true
      return
    }
    this.stepFive = true
    this.stepFour = false
    this.HeaderService.setShowFooter(false)
  }
  addPost(payload: any) {
    this.loading = true;

    this.CommunityServiceService.addPost(payload).subscribe(
      result => {
        if (result.status == "success") {
          this.alert.showSuccess(result.msg, true, true, false);
          this.topicDetail(this.topicDetailPostTopic.id)
          this.stepOne = false
          this.stepTwo = false
          this.stepThree = false
          this.stepFour = false
          this.stepFive = false
          this.stepSix = true
          this.loading = false
          this.HeaderService.setShowFooter(false)
        }
        else {
          this.loading = false

          this.alert.showError(result.msg, true, true, false);
        }
      },
    );
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


  submitForm(type: string) {

    if (this.uploadForm.valid) {

      const payload = {
        title: this.uploadForm.value.title,
        text: this.uploadForm.value.text,
        class_id: null,
        type: "journal_private",
        post_topic_default_id: this.topicDetailPostTopic.id,
        replied_post_id: null,
        post_id: null,
        current_image_name: this.selectedFile?.name || null,
        image: {
          filename: this.selectedFile?.name || null,
          filetype: this.fileType,
          value: this.base64File || null
        }
      };
      if (this.isEditEntry && payload.image.value == null) {
        payload.image.value = this.isJournalPostViewPagedata.image_path
        payload.post_id = this.isJournalPostViewPagedata.id
      }
      else if (this.isEditEntry && payload.image.value) {
        payload.post_id = this.isJournalPostViewPagedata.id
      }
      this.addPost(payload)
    }

  }
  goBack() 
  {
    this.stepTwo = true;
    this.stepSix = false;
    this.HeaderService.setShowFooter(true);
  }

  ngOnDestroy() {
    this.headerBackRef.unsubscribe();
  }
}

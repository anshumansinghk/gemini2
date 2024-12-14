import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared';
import { ProgressserviceService } from '../../service/progressservice.service';
import { classDetailResponse, topicListResponse, Class, Topic, Detail, topicDetailWrittenPractice } from '../../models/progress.model'
import { HeaderService } from 'src/app/header/header.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { WrittenpracticeService } from 'src/app/writtenpractice/service/writtenpractice.service';
import { atLeastOneCheckboxSelectedValidator } from 'src/app/validators';
import { Location } from '@angular/common';
import { Subscription } from "rxjs";

@Component({
  selector: 'ss-learningtopic',
  templateUrl: './learningtopic.component.html',
  styleUrls: ['./learningtopic.component.scss']
})
export class LearningtopicComponent {
  classId: string
  classDetailResult: topicListResponse
  classes: Class
  topics: Topic[];
  topicDetailPageDetail: Detail[];
  isTopicDetailPage: boolean = false
  header: string;
  url: string;
  isYouTubeUrl: boolean;
  ytVideoId: string = '';
  playerVars = {
    cc_lang_pref: 'en',
    rel: 0
  };
  questionForm: FormGroup;
  loading: boolean = false
  currentId: string;
  isValid: boolean = false
  writtenPracticeDetail: topicDetailWrittenPractice;
  headerBackRef !:Subscription;

  constructor(private location:Location,public WrittenpracticeService: WrittenpracticeService, public router: Router, private route: ActivatedRoute, private alert: AlertService, private ProgressserviceService: ProgressserviceService, private HeaderService: HeaderService, private fb: FormBuilder) {
  }
  ngOnInit() {
    this.HeaderService.setBack('method');
    this.HeaderService.setTitle("Learning");
    this.headerBackRef=
    this.HeaderService.callBackMethod.subscribe(() => {
      this.backStep();
    });

    this.questionForm = this.fb.group({});
    this.route.queryParams.subscribe(params => {
      this.classId = params.id
      this.getTopicListdata(this.classId)
      this.questionForm = this.fb.group({
        questions: this.fb.array([])
      });
    });
  }
  onShowPicker(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.showPicker) {
      inputElement.showPicker();
    }
  }

  backStep() {
    if (this.isTopicDetailPage) {
      this.isTopicDetailPage = false
    }
    else {
      this.isTopicDetailPage = false
      this.HeaderService.setBack('../');
      this.router.navigate([this.HeaderService.popRouteHistory()]);
      // this.location.back()
    }
  }

  get questions(): FormArray {
    return this.questionForm.get('questions') as FormArray;
  }
  getTopicListdata(classId: string) {
    this.loading = true
    this.ProgressserviceService.getTopicListdata({ "class_id": classId }).subscribe(
      result => {
        this.classDetailResult = result
        this.classes = result.data.class
        this.topics = result.data.topics
        this.loading = false
      },
    );
  }
  topicDetailPage(topicId: string) {
    this.loading = true
    this.currentId = topicId
    this.isTopicDetailPage = true;
    this.ProgressserviceService.topicDetailPage({ "topic_id": topicId }).subscribe(
      result => {
        this.header = result.data.topics.title;
        this.HeaderService.setTitle(result.data.topics.title);
        this.topicDetailPageDetail = result.data.topics.detail
        this.writtenPracticeDetail = result.data.written_practice
        this.questionForm = this.fb.group({});
        this.topicDetailPageDetail.forEach((data) => {
          if (data.option_type === 'checkbox' && data.options) {
            const checkboxArray = this.fb.array(
              data.options.map((option) => {
                return this.fb.group({
                  option_id: [option.option_id], 
                  response: [
                    option.user?.response ? option.user.response : '',,
                  ], 
                })
              })
            );
            // checkboxArray.setValidators(atLeastOneCheckboxSelectedValidator());
            this.questionForm.addControl(`checkbox_${data.question_id}`, checkboxArray);
            // this.setCheckboxValuesFromBackend(data);
            checkboxArray.setValidators(atLeastOneCheckboxSelectedValidator());
            checkboxArray.updateValueAndValidity();
          }
          else if (data.option_type === 'radio' && data.options) {
            const radioboxArray = this.fb.array(
              data.options.map((option) => {
                return this.fb.group({
                  option_id: [option.option_id,Validators.required], 
                  response: [
                    option.user?.response ? option.user.response : '',
                  ], 
                })
                // const selectedOption = option.user?.response;
                // return this.fb.control(selectedOption ? selectedOption : null);
              })
            );
            radioboxArray.setValidators(atLeastOneCheckboxSelectedValidator());
            // this.setCheckboxValuesFromBackend(data);
            this.questionForm.addControl(`radio_${data.question_id}`, radioboxArray);
            // console.log(this.questionForm);
            
          }
          else if (data.option_type === 'text' && data.options) {
            const textArray = this.fb.array(
              data.options.map((res) => {
                return this.fb.group({
                  option_id: [res.option_id, Validators.required], 
                  response: [
                    res.user?.response ? res.user.response : '',
                    Validators.required,
                  ], 
                });
              })
            );
            this.questionForm.addControl(`text_${data.question_id}`, textArray);
          }
          else if (data.option_type === 'date' && data.options) {
            const dateArray = this.fb.array(
              data.options.map((res) => {
                return this.fb.group({
                  option_id: [res.option_id, Validators.required], 
                  response: [
                    res.user?.response ? this.formatDate(res.user.response) : '',
                    Validators.required,
                  ], 
                });
              })
            );
            this.questionForm.addControl(`date_${data.question_id}`, dateArray);
          }
        });
        this.loading = false
      }
    );

  }
  setCheckboxValuesFromBackend(data: any) {
    const checkboxArray = <FormArray>this.questionForm.get(`checkbox_${data.question_id}`);
    const updatedValues = data.options.map((option:any) => {
      return option.user?.response ? option.option_id : null;
    });
    checkboxArray.patchValue(updatedValues);
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  }
  
  getFormArray(name: string): FormArray | null {
    return this.questionForm.get(name) as FormArray | null;
  }


  isYouTubeLink(url: string): boolean {
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  youbuteLink(url: string) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)(\/.*)?$/;
    this.url = url;
    this.isYouTubeUrl = youtubeRegex.test(this.url);
    this.ytVideoId = this.url.split('v=')[1];
    return this.ytVideoId
  }

  onSubmit(type: string = ''): void {
    
    if (this.questionForm.valid) {
      var answers: { question_id: string; option_id: string; response: string }[] = [];
      for (const [key, value] of Object.entries(this.questionForm.value)) {
        var subans: { 'question_id': string, 'option_id': string, 'response': string } = { question_id: '', option_id: '', response: '', };

          const myArray = key.split("_");
          if (Array.isArray(value)) {
            for (let data of value) {
              if (data && data.response) {
                subans = { 'question_id': myArray[1], 'option_id': data.option_id, 'response': data.response }
                answers.push(subans);
              }
            }
          }
      }
      let paylaod = { "class_written_practice_id": this.writtenPracticeDetail.class_written_practice_id, "questions": answers, "completed_status": true, "class_topic_id": this.currentId }
      if (type == 'progress') {
        paylaod.completed_status = false
      }
      this.saveClass(paylaod)
    } else {
      this.markFormGroupTouched(this.questionForm)
    }
  }
  saveClass(paylaod: any) {
    this.loading = true
    this.WrittenpracticeService.saveClass(paylaod).subscribe(
      result => {
        this.alert.showSuccess(result.msg, true, true, false);
        this.isTopicDetailPage = false
        this.getTopicListdata(this.classId)
        this.loading = false
      },
    );

  }
  markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  onCheckboxChange(type: string, questionId: string|number|undefined, index: number, optionId: string,optionLavel:string|null,evn:Event,lengthOfOption:any): void {
    const isChecked = (evn.target as HTMLInputElement).checked;
    const formArrayName = `${type}_${questionId}`;
    const formArray = this.getFormArray(formArrayName);
    if(type=='radio'){
      for(let i=0;i<lengthOfOption.length;i++){
        if (formArray) {
          formArray.at(i).setValue({option_id: lengthOfOption[i].option_id, response: ''}); 
        }
      }
    }
    if (formArray) {
      const currentValue = formArray.at(index).value;
      if (isChecked) {
        formArray.at(index).setValue({option_id: optionId, response: optionLavel});

      } else {
        formArray.at(index).setValue(null); 
      }
    }
  }
  
  ngOnDestroy() {
    this.headerBackRef.unsubscribe();
  }
}

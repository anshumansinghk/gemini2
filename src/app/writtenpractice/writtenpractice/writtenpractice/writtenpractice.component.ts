import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared';
import { HeaderService } from 'src/app/header/header.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { WrittenpracticeService } from '../../service/writtenpractice.service';
import { WrittenPracticeResponse, WrittenPracticePaylaod, Practice, QuestionDetailResponse, WrittenPractice, TopicDetail, Question } from '../../models/writtenpracticemodel'
import { Location } from '@angular/common';
import { atLeastOneCheckboxSelectedValidator } from 'src/app/validators';
import { Subscription } from "rxjs";

@Component({
  selector: 'ss-writtenpractice',
  templateUrl: './writtenpractice.component.html',
  styleUrls: ['./writtenpractice.component.scss']
})
export class WrittenpracticeComponent {
  practices: Practice[]
  WrittenPractice: WrittenPractice
  loading: boolean = false
  stepOne: boolean = true;
  stepTwo: boolean = false;
  writtenTopic: TopicDetail[];
  url: string;
  isYouTubeUrl: boolean;
  ytVideoId: string;
  dynamic_class: string = 'form-control'
  playerVars = {
    cc_lang_pref: 'en',
    rel: 0
  };
  writtenQuestion: Question[];
  questionForm: FormGroup;
  currentPracticeId: string;
  submitted = false;
  currentClassId: string;
  headerBackRef !:Subscription;

  constructor(private location: Location, private WrittenpracticeService: WrittenpracticeService, public router: Router, private route: ActivatedRoute, private alert: AlertService, private HeaderService: HeaderService, private fb: FormBuilder) {
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.getWrittenPractice(params.id)
      this.currentClassId = params.id
      this.HeaderService.setTitle(params.title);
      this.HeaderService.setBack('method');
      this.headerBackRef =
      this.HeaderService.callBackMethod.subscribe(() => {
        this.backStep();
      });
    });

  }

  backStep() {
    if (this.stepOne) {
      this.HeaderService.setBack('../');
      this.router.navigate([this.HeaderService.popRouteHistory()]);
      // this.location.back()
    }
    else if (this.stepTwo) {
      this.stepOne = true
      this.stepTwo = false
    }
  }
  getWrittenPractice(classId: string) {
    this.loading = true
    this.WrittenpracticeService.getWrittenPractice({ "class_id": classId }).subscribe(
      result => {
        this.practices = result.data.practices
        this.loading = false
      },
    );

  }

  getWrittenPracticeQuestion(id: string) {
    this.loading = true
    this.currentPracticeId = id
    this.WrittenpracticeService.getWrittenPracticeQuestion({ "class_written_practice_id": id }).subscribe(
      result => {
        this.WrittenPractice = result.data.written_practice
        this.writtenTopic = result.data.topic.detail
        this.writtenQuestion = result.data.questions
        this.stepOne = false
        this.stepTwo = true
        this.loading = false

        this.questionForm = this.fb.group({});
        this.writtenQuestion.forEach((data) => {
          if (data.type === 'checkbox' && data.options) {
            const checkboxArray = this.fb.array(
              data.options.map((option) => {
                return this.fb.group({
                  option_id: [option.option_id],
                  response: [option.user?.response ? option.option_label : ''], // Ensure this matches the value in HTML
                });
              })
            );
            this.questionForm.addControl(`checkbox_${data.question_id}`, checkboxArray);
            checkboxArray.setValidators(atLeastOneCheckboxSelectedValidator());
            checkboxArray.updateValueAndValidity();
          }
          else if (data.type === 'radio' && data.options) {
            const radioboxArray = this.fb.array(
              data.options.map((option) => {
                return this.fb.group({
                  option_id: [option.option_id, Validators.required],
                  response: [
                    option.user?.response ? option.user.response : '',
                  ],
                })
              })
            );
            this.questionForm.addControl(`radio_${data.question_id}`, radioboxArray);
            radioboxArray.setValidators(atLeastOneCheckboxSelectedValidator());
            radioboxArray.updateValueAndValidity();
          }
          else if (data.type === 'text' && data.options) {
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
          else if (data.type === 'date' && data.options) {
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
      },
    );
  }
  onCheckboxChange(type: string, questionId: string|number|undefined, index: number, optionId: string,optionLavel:string|null,evn:Event,Option:any): void {
    const isChecked = (evn.target as HTMLInputElement).checked;
    const formArrayName = `${type}_${questionId}`;
    const formArray = this.getFormArray(formArrayName);
    if(type=='radio'){
      for(let i=0;i<Option.length;i++){
        if (formArray) {
          formArray.at(i).setValue({option_id: Option[i].option_id, response: ''}); 
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
  getFormArray(name: string): FormArray | null {
    return this.questionForm.get(name) as FormArray;
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
  get questions() {
    return this.questionForm.get('questions') as FormArray;
  }

  getAnswers(i: number) {
    return this.questions.at(i).get('answers') as FormArray;
  }
  onSubmit(type: string) {
    this.submitted = true;

    if (this.questionForm.invalid) {
      this.questionForm.markAllAsTouched();
      return;
    }
    else {
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
      let paylaod = { "class_written_practice_id": this.currentPracticeId, "questions": answers, "completed_status": true }
      if (type == 'progress') {
        paylaod.completed_status = false
      }
      this.saveClass(paylaod)
    }
  }
  isQuestionValid(index: number): boolean {
    const answers = this.questions.at(index).get('answers') as FormArray;
    return answers.controls.some((control) => control.value); // At least one answer must be selected
  }
  saveClass(paylaod: any) {
    this.loading = true
    this.WrittenpracticeService.saveClass(paylaod).subscribe(
      result => {
        this.alert.showSuccess(result.msg, true, true, false);
        this.stepOne = true
        this.stepTwo = false
        this.loading = false
        this.getWrittenPractice(this.currentClassId)
      },
    );
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



  submitWithoutQuestion(type: string) {
    if (type == 'submit') {
      let paylaod = { "class_written_practice_id": this.currentPracticeId, "questions": [], "completed_status": true }
      this.saveClass(paylaod)
    }
    else {
      let paylaod = { "class_written_practice_id": this.currentPracticeId, "questions": [], "completed_status": false }
      this.saveClass(paylaod)
    }
  }

  onShowPicker(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.showPicker) {
      inputElement.showPicker();
    }
  }

  ngOnDestroy() {
    this.headerBackRef.unsubscribe();
  }
}

import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HeaderService } from '../../../header/header.service';
import { AlertService } from '../../../shared/index';

import { CheckInService } from "../../services/check-in.service";
import Utils from '../../../core/utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ss-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent {
  public errorFlag: boolean = false;
  public formErrors!: string[];
  public loading: boolean = false;
  public courseEpmId: any;
  public questionnaire: any;
  public questionType = "";
  public isPainMedicationQuestion = false;

  public questionForm: FormGroup;
  public question: FormControl;
  public otherQuestion: FormControl;
  public checkboxSelected: { [key: string]: string } = {};
  public routePath:string;
  public checkinType:string='general'

  public generalCheckinTitle:string='';
  public textInput:{ [key: string]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private checkInService: CheckInService,
    private alerter: AlertService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private headerService: HeaderService,
  ) {    
  }

  ngOnInit(): void {
    this.routePath = this.router.url;

    this.headerService.setShowHeader(true,{'back':'../','type':'default'});
    this.headerService.setTitle(this.translate.instant('header.generalCheckin'));
    
    if(this.routePath.includes('/checkin/force')){
        this.headerService.setBack('no-nav');
        this.headerService.setShowFooter(false);
    }

    this.question = new FormControl('', [Validators.required]);
    this.otherQuestion = new FormControl('', []);
    this.questionForm = this.formBuilder.group(
      {
        question: this.question,
        otherQuestion: this.otherQuestion
      }
    );

    this.route.params.subscribe((param) => {


      this.courseEpmId = param['id'] ?? null;
      this.checkinType = param['type']??this.checkinType ;
      this.loading = true;

       this.checkInService.getGenearalList().subscribe(
        res => {
          if (res.status=="success") {
            const checkinList = res.data?.list;

            const generalCheckin = checkinList.filter(
              (item:any)=>{
                return ((this.checkinType == 'general' && item.course_epm_id == this.courseEpmId)
                ||
                (this.checkinType == 'pain' && !item.course_epm_id))
              })[0]??{};

            this.generalCheckinTitle = generalCheckin?.title??'';

            this.getQuestionnaire(this.courseEpmId);
          }   
        },
        err => {
          this.loading = false;
        }
      );
    });

  }

  getQuestionnaire(courseEpmId: any) {
    if (!Utils.isempty(courseEpmId) || this.checkinType=='pain') {
      if (this.checkinType=='pain') {
        // this.checkInHeading = "Pain Medication Tracker";
        this.isPainMedicationQuestion = true;
        this.checkInService.getPainMedicaion({ "pain_medication_tracker_participant_id": this.courseEpmId }).subscribe(
          res => {
            if (res.status == "success") {
              this.questionnaire = res?.result ?? null;
              this.questionType = res?.result.responseFormat ?? "";
            }
            this.loading = false;
          },
          err => {
            this.loading = false;
          }
        );
      } else {
        // this.checkInHeading = "Gemini Daily Log";
        this.checkInService.getGeneralCheckin({ "course_epm_id": courseEpmId, "next": true, "checkin_type": "checkin" }).subscribe(
          res => {
            if (res.status == "success") {
              this.questionnaire = res?.result ?? null;
              this.questionType = res?.result.responseFormat ?? "";
            }
            this.loading = false;
          },
          err => {
            this.router.navigate(["/checkin"]);
            this.loading = false;
          }
        );
      }

    }
    this.questionForm.reset();
  }

  nextQuestion(answer: any) {
    // this.checkInHeading = "Gemini Daily Log";
    let playload = { "assessment_oid": this.questionnaire.assessmentOID, "session_id": this.questionnaire.sessionId, "qa_id": this.questionnaire.qaId, "item_response_oid": 0, "label": "", "value": "", "text_answer": "", "previous": "" };
    if (this.questionType == "likert") {
      let selectedOption = this.questionnaire?.selectionOptions.filter((op: any) => op.value == answer.question)[0] ?? {};
      playload = { "assessment_oid": this.questionnaire.assessmentOID, "session_id": this.questionnaire.sessionId, "qa_id": this.questionnaire.qaId, "item_response_oid": selectedOption.itemResponseOID, "label": selectedOption.label, "value": selectedOption.value, "text_answer": "", "previous": "" };
    } else if (this.questionType == "text") {
      playload = { "assessment_oid": this.questionnaire.assessmentOID, "session_id": this.questionnaire.sessionId, "qa_id": this.questionnaire.qaId, "item_response_oid": 0, "label": "", "value": "", "text_answer": answer.question, "previous": "" };
    } else if (this.questionType == "rating") {
      playload = { "assessment_oid": this.questionnaire.assessmentOID, "session_id": this.questionnaire.sessionId, "qa_id": this.questionnaire.qaId, "item_response_oid": 0, "label": answer.question, "value": answer.question, "text_answer": "", "previous": "" };
    }

    if (this.questionForm.valid) {
      this.loading = true;
      this.checkInService.nextQuestionnaire(playload).subscribe(
        res => {
          this.questionForm.reset();
          this.questionnaire = res.result;
          if (res.result.doneFlag) {
            this.router.navigate(["/checkin"]);
          }
          this.questionType = res?.result.responseFormat ?? "";
          if (res.status == "success") {

            const message = res.msg && res.msg.trim() ? res.msg : this.translate.instant('saveConfirmationMessage');
            // this.alerter.showSuccess(message, true, true, false);
          } else {
            this.alerter.showError(res.msg, true, true, false);
          }

          this.loading = false;
        },
        err => {
          this.loading = false;
          console.log(err);
        }
      );
    } else {
      this.formErrors = []
    }
  }

  nextPainQuestion(answer: any) {
    // this.checkInHeading = "Pain Medication Tracker";

     if (this.questionForm.valid) {
        let playload = {
          "pain_medication_tracker_question_id": "",
          "pain_medication_tracker_option_ids": [""],
          "response": [""],
          "pain_medication_tracker_participant_id": "",
          "pain_medication_tracker_response_id": ""
        };

        if (this.questionType == "likert") {
          let selectedOption = this.questionnaire?.selectionOptions.filter((op: any) => op.value == answer.question)[0] ?? {};
          playload = {
            "pain_medication_tracker_question_id": this.questionnaire.qaId,
            "pain_medication_tracker_option_ids": [selectedOption.itemResponseOID],
            "response": [selectedOption.label],
            "pain_medication_tracker_participant_id": this.questionnaire.pain_medication_tracker_participant_id,
            "pain_medication_tracker_response_id": this.questionnaire.pain_medication_tracker_response_id
          };
        }
        else if (this.questionType == "checkbox") {
          playload = {
            "pain_medication_tracker_question_id": this.questionnaire.qaId,
            "pain_medication_tracker_option_ids": Object.keys(this.checkboxSelected),
            "response": Object.values(this.checkboxSelected),
            "pain_medication_tracker_participant_id": this.questionnaire.pain_medication_tracker_participant_id,
            "pain_medication_tracker_response_id": this.questionnaire.pain_medication_tracker_response_id
          };
          // this.questionForm.controls['question'].setValue(true);

        }
        else if (this.questionType == "rating") {
          let selectedOption = this.questionnaire?.selectionOptions.filter((op: any) => op.value == answer.question)[0] ?? {};
          playload = {
            "pain_medication_tracker_question_id": this.questionnaire.qaId,
            "pain_medication_tracker_option_ids": [...selectedOption.itemResponseOID],
            "response": [...selectedOption.label],
            "pain_medication_tracker_participant_id": this.questionnaire.pain_medication_tracker_participant_id,
            "pain_medication_tracker_response_id": this.questionnaire.pain_medication_tracker_response_id
          };
        } else if (this.questionType == "text") {
          playload = {
            "pain_medication_tracker_question_id": this.questionnaire.qaId,
            "pain_medication_tracker_option_ids": [],
            "response": [...answer.question],
            "pain_medication_tracker_participant_id": this.questionnaire.pain_medication_tracker_participant_id,
            "pain_medication_tracker_response_id": this.questionnaire.pain_medication_tracker_response_id
          };
        }

    
      this.loading = true;
      this.checkInService.nextPainMedicaion(playload).subscribe(
        res => {
          this.questionForm.reset();
          this.otherOptionValidate(false);
          this.textInput = {};
          
          this.questionnaire = res.result;
          if (res.result.doneFlag) {
            this.router.navigate(["/checkin"]);
          }
          this.questionType = res?.result.responseFormat ?? "";
          if (res.status == "success") {
            this.checkboxSelected = {};
            const message = res.msg && res.msg.trim() ? res.msg : this.translate.instant('saveConfirmationMessage');
            // this.alerter.showSuccess(message, true, true, false);
          } else {
            this.alerter.showError(res.msg, true, true, false);
          }

          this.loading = false;
        },
        err => {
          this.loading = false;
          console.log(err);
        }
      );
    } else {
      this.formErrors = []
    }
  }
  getDigits(min: number, max: number): number[] {
    const digits = [];
    for (let i = min + 1; i < max; i++) {
      digits.push(i);
    }
    return digits;
  }
  checkOptionPain(value: string, event: Event, label: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.checkboxSelected[value] = label;
    } else {
      delete this.checkboxSelected[value];
    }

    if(label.toLowerCase()=='other' && isChecked){
      this.otherOptionValidate(true);
      this.textInput[value] = '';
    }else if(label.toLowerCase()=='other' && !isChecked){
      this.otherOptionValidate(false);
      delete this.textInput[value];
    }
  }

  otherOptionValidate(required:boolean=false){
    this.questionForm.controls.otherQuestion.setValidators(required?[Validators.required]:null);
    this.questionForm.controls.otherQuestion.updateValueAndValidity();
  }

  otherText(value:string,event:Event){
    let target = (event.target as HTMLInputElement)
    this.checkboxSelected[value]=target?.value;
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    this.headerService.setShowFooter(true);
  }
}

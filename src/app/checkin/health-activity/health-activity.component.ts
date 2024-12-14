import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CheckInService } from "../services/check-in.service";
import { SubmitCheckInDetails } from "../models/health-checkin";
import { AlertService, ModalService } from "src/app/shared";
import { HeaderService } from '../../header/header.service';
import { SubscriptionLike } from "rxjs";

type MoodType = 'start' | 'mental' | 'physical' | 'medications' | 'bloodpressure' | 'pulse' | 'weight' | 'thanks';

@Component({
  selector: 'ss-health-activity',
  templateUrl: './health-activity.component.html',
  styleUrls: ['./health-activity.component.scss']
})
export class HealthActivityComponent {
  constructor(
    private modalService: ModalService,
    private checkInService: CheckInService,
    private route: ActivatedRoute,
    private router: Router,
    private alerter: AlertService,
    private headerService: HeaderService
    ) { 
     // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
  }
  isFirstCheckin = true;
  mentalRangeValue: number | "";
  physicalRangeValue: number | "";
  is_supplement_taken: number | "";
  systolicValue: number | "";
  diastolicValue: number | "";
  bpmValue: number | "";
  weightValue: number | "";
  weighunitValue: string | "" = "lbs";

  thankYouPage:boolean = false; 

  progressState: number = 0;
  skippable: boolean = false;
  type: MoodType = 'mental';
  origin: string = "general";
  mainTitle: string = '';
  mainSubTitle: string = '';
  currentMoodImage: string = 'assets/images/checkin-mood/nuetral.png';
  currentMoodText: string = "I'm okay";

  private modalCloseSubscription!: SubscriptionLike;


  private moodConfig: Record<MoodType, { title: string; subtitle: string, progress: number, skippable: boolean }> = {
    start:{
      title: "Now let's start your health check-in",
      subtitle: "You will be asked a few questions about your health and well-being. It will only take about 5 minutes.",
      progress: 0,
      skippable:false
    },
    mental: {
      title: "How are you feeling today emotionally?",
      subtitle: "Please slide the round green button below to the left or right to select how you feel.",
      progress: 16.6,
      skippable:false
    },
    physical: {
      title: "How are you feeling today physically?",
      subtitle: "Please slide the round green button below to the left or right to select how you feel.",
      progress: 33.2,
      skippable:false
    },
    medications: {
      title: "Did you take your medications or supplements today?",
      subtitle: "Please select one of the choices below.",
      progress: 49.8,
      skippable:false
    },
    bloodpressure: {
      title: "What is your blood pressure today?",
      subtitle: "",
      progress: 66.4,
      skippable:true
    },
    pulse: {
      title: "What is your pulse reading today?",
      subtitle: "",
      progress: 83,
      skippable:true
    },
    weight: {
      title: "What is your weight today?",
      subtitle: "",
      progress: 100,
      skippable:true
    },
    thanks: {
      title: "",
      subtitle: "",
      progress: 0,
      skippable:false
    },
  };

  private moodRanges: Record<MoodType, { range: [number, number]; image: string; text: string }[]> = {
    start:[],
    mental: [
      { range: [1, 2], image: 'assets/images/checkin-mood/cry.png', text: "Really bad" },
      { range: [3, 4], image: 'assets/images/checkin-mood/sad.png', text: "Not good" },
      { range: [5, 6], image: 'assets/images/checkin-mood/nuetral.png', text: "I'm okay" },
      { range: [7, 8], image: 'assets/images/checkin-mood/smile.png', text: "Good" },
      { range: [9, 10], image: 'assets/images/checkin-mood/laugh.png', text: "Really good" },
    ],
    physical: [
      { range: [1, 3], image: 'assets/images/checkin-mood/cry.png', text: "Not comfortable at all" },
      { range: [4, 7], image: 'assets/images/checkin-mood/nuetral.png', text: "Sort of comfortable" },
      { range: [8, 10], image: 'assets/images/checkin-mood/laugh.png', text: "Really comfortable" },
    ],
    medications: [],
    bloodpressure: [],
    pulse: [],
    weight: [],
    thanks: [],
  };

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.type = param["type"] as MoodType || 'mental';
      this.origin = param["origin"];
      const config = this.moodConfig[this.type];
      this.mainTitle = config?.title || "";
      this.mainSubTitle = config?.subtitle || "";
      this.progressState = config?.progress || 0;
      this.skippable = config?.skippable || false;

      
      if (this.type === 'physical') {
        this.currentMoodText = "Sort of comfortable";
      }
    });

    this.headerAction();
  }

  headerAction(){
    
    //set header
    if(this.type == 'start'){
      this.headerService.setShowHeader(false);
      this.headerService.setShowFooter(false);
    }
    else{
      this.headerService.setBack('method');
      this.headerService.setShowHeader(true,{'type':'progress','back':'../'});
    }
    
    this.headerService.setProgress(this.progressState);
    
    if(this.skippable && this.origin == 'force'){
      this.headerService.setActionRightVal({title:'skip',class:'green'});
    }else{
      this.headerService.setActionRightVal({title:'',class:'d-none'});
    }
    this.headerService.setShowFooter(false);

    this.headerService.callActionRight.subscribe(() => {
      this.skipQuestionModal();
    });
  }

  getRangeValue(type: string): number {
    if (type === 'mental') {
      return this.mentalRangeValue || 5;
    } else {
      return this.physicalRangeValue || 5;
    }
  }

  setRangeValue(type: string, value: number): void {
    if (type === 'mental') {
      this.mentalRangeValue = value;
    } else {
      this.physicalRangeValue = value;
    }
  }

  updateMoodImage() {
    const ranges = this.moodRanges[this.type] || [];
    const rangeValue = this.type === 'mental' ? this.mentalRangeValue : this.physicalRangeValue;


    const numericRangeValue = typeof rangeValue === 'number' ? rangeValue : 5;

    const mood = ranges.find(r => numericRangeValue >= r.range[0] && numericRangeValue <= r.range[1]);

    if (mood) {
      this.currentMoodImage = mood.image;
      this.currentMoodText = mood.text;
    }
  }

  setSupplementTaken(value: boolean): void {
    this.is_supplement_taken = value ? 1 : 0;
    this.submitCheckinForm();
  }

  submitCheckIn(data: SubmitCheckInDetails) {

    this.checkInService.submitCheckIn(data).subscribe(
      response => {
        //this.alerter.showSuccess(response.msg, true,true,false);

        this.mentalRangeValue = "";
        this.physicalRangeValue = "";
        this.is_supplement_taken = "";
        this.systolicValue = "";
        this.diastolicValue = "";
        this.bpmValue = "";
        this.weightValue = "";
        this.weighunitValue = "";
        if (this.isFirstCheckin) {
          const moodTypes: MoodType[] = ['start','mental', 'physical', 'medications', 'bloodpressure', 'pulse', 'weight'];

          const currentIndex = moodTypes.indexOf(this.type);

          if(this.origin=='general'){
            this.router.navigate(["/dashboard"]);
          }else if (currentIndex !== -1 && currentIndex < moodTypes.length - 1) {
            const nextMoodType = moodTypes[currentIndex + 1];
            this.headerAction();
            this.router.navigate([`/checkin/health-activity/${nextMoodType}/force`]);
          } else {
            this.router.navigate(["/dashboard"]);
          }
        } else {
          this.router.navigate(["/dashboard"]);
        }
      },
      error => {
        console.log(error);
      }
    )
  }
  submitCheckinForm() {
    const checkInData: SubmitCheckInDetails = {
      emotional_feeling: this.mentalRangeValue != undefined ? this.mentalRangeValue.toString() : '',
      physical_feeling: this.physicalRangeValue != undefined ? this.physicalRangeValue.toString() : '',
      is_supplement_taken: this.is_supplement_taken != undefined ? this.is_supplement_taken ? '1' : '0' : '',
      systolic_bp: this.systolicValue ? this.systolicValue.toString() : '',
      diastolic_bp: this.diastolicValue ? this.diastolicValue.toString() : '',
      pulse_reading: this.bpmValue ? this.bpmValue.toString() : '',
      weight: this.weightValue ? this.weightValue.toString() : '',
      weight_unit: this.weightValue ? this.weighunitValue : ''
    };


    this.submitCheckIn(checkInData);

  }

  skipQuestionModal(){
    this.modalService.open(['skip-health-checkin'], {
      data: {},
      currentMenuOption : {}
    });

    this.modalCloseSubscription = this.modalService.onClose.subscribe(
      (closeData) => {
        if(closeData.data == 'YES'){
          this.router.navigate([`/checkin/health-activity/thanks/force`])
          // this.thankYouPage = true;
        }
        else{
          
          // this.headerService.setShowHeader(true,{'type':'progress','back':'../'});
          this.headerService.setProgress(this.progressState);
          this.headerService.setBack('method');
          if(this.skippable){
            this.headerService.setActionRightVal({title:'skip',class:'green'});
          }else{
            this.headerService.setActionRightVal({title:'',class:'d-none'});
          }
        }
        
        // this.currentMenuOption = closeData.data.value;
        // console.log(closeData);
        
        this.modalCloseSubscription.unsubscribe();
        // this.libraryList(null,this.currentMenuOption,"")
      }
    );
  }

  startCheckIn(){
    const moodTypes: MoodType[] = ['start','mental', 'physical', 'medications', 'bloodpressure', 'pulse', 'weight'];

    const currentIndex = moodTypes.indexOf(this.type);
    const nextMoodType = moodTypes[currentIndex + 1];
    this.router.navigate([`/checkin/health-activity/${nextMoodType}/force`]);
  }

  ngOnDestroy(): void {
    this.headerService.setShowFooter(true);
  }

}

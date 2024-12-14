export interface SubmitCheckInDetails{
    emotional_feeling: string;
    physical_feeling: string;
    is_supplement_taken: string;
    systolic_bp: string;
    diastolic_bp: string;
    pulse_reading: string;
    weight: string;
    weight_unit: string;
}

export interface SubmitCheckInResponse{
    msg:string,
    status:string,
    status_code:number
}

// "Pre" prefix for preview and "play" stands for playload follow standard

export interface PreGetGeneralList {
    data?:any;
    msg: string;
    status: string;
    status_code: string;
}

export interface PlayGetGeneralCheckin {
    course_epm_id?:string;
    next: boolean;
    checkin_type: string;
}
export interface PlayGetPainMedication {
    pain_medication_tracker_participant_id: null;
}

export interface PlayNextGeneralCheckin {
    assessment_oid:string,
    session_id:string,
    qa_id:string,
    item_response_oid:number,
    label:string,
    value:string,
    text_answer:string,
    previous:string
}
export interface PlayNextPainMedication {
    pain_medication_tracker_question_id: string,
    pain_medication_tracker_option_ids: string[],
    response: string[],
    pain_medication_tracker_participant_id: string,
    pain_medication_tracker_response_id: string
}



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
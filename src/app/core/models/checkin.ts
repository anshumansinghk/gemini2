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


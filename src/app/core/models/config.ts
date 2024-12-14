export interface Config {
    apiRoot: string;
    tokenRefreshRate: number;
    sessionTimeOut: number;
    domainReference: string;
    messagePrefix: string;
    isDebugMode: boolean;
    site:Array<any>;
    access:FeaturesAccess;
}


export interface FeaturesAccess{
    features?:{
        enable_check_in_button: boolean;
        enable_community:boolean;
        enable_companion_site:boolean;
        enable_health_check_in:boolean;
        enable_practice_log:boolean;
        force_general_checkin:boolean;
        is_companion:boolean;
        is_course_expired:boolean;
        substitute_class:string;
    }
    total_notification?:number;
}

export interface PreForceGeneralData {
    data?:any;
    msg: string;
    status: string;
    status_code: string;
}
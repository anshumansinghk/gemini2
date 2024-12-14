export interface GetMessageResponse {
    msg: string;
    status: string;
    status_code: number;
    data: {
        class_list: Class[];
        current_class_detail: CurrentClassDetail;
        group_detail: {};
        today_visits: GroupVisit[];
        still_do: StillDo[];
        is_course_expired: boolean;
    };
}

export interface Class {
    title: string;
    class_id: string;
    description: string;
    class_number: string;
    class_start_date: string;
    class_end_date: string;
    class_status: string;
    complete_status: string;
    post_topics: [];
}

export interface CurrentClassDetail {
    title: string;
    class_id: string;
    description: string;
    overview: string;
    class_number: string;
    group_schedule_id: string;
    post_topics: []; 
    class_objective: []; 
    class_activity: {};
    target_progress: any[]; 
    complete_status: string;
}

export interface StillDo {
    title: string;
    class_id: string;
    description: string;
    overview: string;
    class_number: string;
    group_schedule_id: string;
    post_topics: [];
    class_objective: [];
    class_activity: {};
    target_progress: {};
    complete_status: string;
}

export interface GroupVisit {
    group_schedule_id: string;
    class_number: string;
    class_title: string;
    group_id: string;
    class_id: string;
    teleconf_url: string;
    leaders: string;
    note: string;
    group_name: string;
    total_participants: number;
    is_external_visit: boolean;
    visit_date: string;
    visit_time: string;
    group_visit_id: string;
    timezone: string;
}
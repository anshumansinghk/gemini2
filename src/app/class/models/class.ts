// class    ----------------------------------------

export interface ClassListData{
    data:ClassesList,
    msg:string,
    status:string,
    status_code:number
}

export interface ClassesList{
    classes:Classes[]
}

export interface Classes{
    class_end_date:string,
    class_id:string,
    class_number:string,
    class_start_date:string,
    class_status:string
    complete_status:string,
    description:string
    post_topics:Array<PostTopics>
    title:string
}

export interface PostTopics{
    title: string, 
    instruction: string, 
    id: string, 
    type: string
}


export interface VirtualVisit{
    data:VirtualVisitData,
    msg:string,
    status:string,
    status_code:number
}

export interface VirtualVisitData{
    today_visits: Array<VisitData> | [],
    completed_visits: Array<VisitData> | [],
    upcoming_visits:Array<VisitData> | []
}

export interface VisitData{
    group_schedule_id: string,
    class_number: string,
    class_title: string,
    group_id: string,
    class_id: string,
    teleconf_url: string,
    leaders: string,
    note: string,
    group_name: string,
    total_participants: number,
    is_external_visit: boolean,
    visit_date: string,
    visit_time: string,
    group_visit_id: string,
    timezone: string
}

export interface PrevClassData{
    data:ClassData,
    msg:string,
    status:string,
    status_code:number
}

export interface ClassData{
    title: string,
    class_id: string,
    description: string,
    overview: string | null,
    class_number: string,
    group_schedule_id: string,
    complete_status: string,
    post_topics?:Array<PostTopics>,
    class_objective?:Array<ClassObjective>,
    class_activity?:ClassActivity,
    target_progress?:TargetProgress
}

export interface ClassActivity{
    topic:Topic,
    practices:Array<Practices>,
    written_practice:WrittenPractice,
}
export interface Practices{
    title: string,
    description: string,
    id: string,
    type: string
}

export interface Topic{
    title:string,
    description:string
}

export interface WrittenPractice{
    title:string,
    description:string
}

export interface ClassObjective{
    title: string,
    id: string,
    is_done: boolean
}

export interface TargetProgress{
    learning_topic: string,
    mind_practice: string,
    body_practice: string,
    community: string,
    journal: string,
    written_practice: string
}

export interface PrevObjectiveData{
    data:ObjectiveData,
    msg:string,
    status:string,
    status_code:number
}

export interface ObjectiveData{
    class_objective_done:boolean
}

export interface AttendanceData{
    msg:string,
    status:string,
    status_code:number
}


export interface PrevPracticeLogData{
    data:PracticeLogData,
    msg:string,
    status:string,
    status_code:number
}

export interface PracticeLogData{
    data:PracticeLog
}

export interface PracticeLog{
    completed_target: PracticeLogTarget,
    remain_targets: number,
    given_target: PracticeLogTarget

    // given_target: {
    //     "mind": number,
    //     "body": number
    // }
}

export interface PracticeLogTarget{
    mind: number, 
    body: number
}
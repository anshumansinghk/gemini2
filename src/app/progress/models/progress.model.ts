export interface currentClassProgressResponce {
    status: string,
    msg: string,
    status_code: number,
    data: classData
}
export interface classData {
    target_assigned: targetAssignedData,
    access_percentage: accessPercentageData,
    num_times_access: numTimesAccessData,
    complete_status: string,
    is_course_expired: boolean,
}
export interface targetAssignedData {
    learning_topic: number | null | undefined,
    mind_practice: number | null | undefined,
    body_practice: number | null | undefined,
    community: number | null | undefined,
    journal: number | null | undefined,
    written_practice: number | null | undefined,
}
export interface accessPercentageData {
    learning_topic: string,
    mind_practice: string,
    body_practice: string,
    community: string,
    journal: string,
    written_practice: string,
}
export interface numTimesAccessData {
    learning_topic: number,
    mind_practice: number,
    body_practice: number,
    community: number,
    journal: number,
    written_practice: number,
}

// class detail interface

export interface classDetailPaylaod {
    class_id: string,
    is_current_class: string | boolean
}
export interface classDetailResponse {
    status: string,
    msg: string,
    data: classDetailResponseData
    status_code: number
}
export interface classDetailResponseData {
    title: string,
    class_id: string,
    description: string,
    overview: string,
    class_number: string,
    group_schedule_id: string,
    post_topics: postTopics[],
    class_objective: classObjective[],
    class_activity: classActivity,
    target_progress: targetProgress,
    complete_status: string
}
export interface postTopics {
    title: string;
    instruction: string;
    id: string;
    type: string;

}
export interface classObjective {
    title: string;
    id: string;
    is_done: boolean;

}
export interface classActivity {
    topic: {
        title: string;
        description: string;
    };
    practices: Practice[];
    written_practice: WrittenPractice;

}
export interface targetProgress {
    learning_topic: string;
    mind_practice: string;
    body_practice: string;
    community: string;
    journal: string;
    written_practice: string;
}

export interface Practice {
    title: string;
    description: string;
    id: string;
    type: string;
}

export interface WrittenPractice {
    title: string;
    description: string;
}


//   topic list interface

export interface Topic {
    title: string;
    id: string;
    position: string;
    is_completed: boolean;
}
export interface Class {
    title: string;
    description: string;
    overview: string;
}

export interface topicListResponse {
    status: string;
    msg: string;
    data: {
        topics: Topic[];
        class: Class;
    };
    status_code: number;
}

export interface getTopicListdataPaylaod {
}

export interface topicDetailPagePaylaod {
    topic_id:string
}


export interface Detail {
    id: string;
    text: string | null;
    image_id: string | null;
    resource_id: string | null;
    position: string;
    type: string;
    title: string | null;  // Consistently allow `null`
    path: string;
    question_id?: string;
    question?: string;
    number_option_line?: string;
    is_other?: string;
    options?: Option[];
    option_type?: string;
  }
  export interface Option {
    option_id: string;
    option_label: string | null;
    other_option_label: string | null;
    user?: {
        created_at:string,
        response:string
    }
  }
  
  export  interface Topics {
    title: string;
    id: string;
    class_id: string;
    detail: Detail[];
  }
  
  export  interface topicDetailWrittenPractice {
    written_practice_id: string;
    title: string | null;  // Allow `null` for title
    description: string | null;  // Allow `null` for description
    class_written_practice_id: string;
    pop_by_last_class: string;
    pop_by_last_entry: string;
    duplicate_practice_id: string | null;
    class_id: string;
  }
  
  export interface topicDetailPage {
    status: string;
    msg: string;
    data: {
      topics: Topics;
      written_practice: topicDetailWrittenPractice;
    };
    status_code: number;
  }
  
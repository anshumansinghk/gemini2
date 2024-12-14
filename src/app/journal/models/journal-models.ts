export interface PostTopicPayload {
    class_id: string
}

export interface PostTopicResponse {
    status: string;
    msg: string;
    data: PostTopicData;
    status_code: number;
}

export interface PostTopicData {
    post_topic: PostTopic[];
}

export interface PostTopic {
    id: string;
    title: string;
    instruction: string;
    target_number: number;
    completed_at: string;
    target_completed: number;
}



export interface topicDetailPayload {
    post_id: string,
    post_topic_id: string,
    is_show_posts: boolean,
}
export interface JournalPostsResponse {
    status: string;
    msg: string;
    data: JournalPostsData;
    status_code: number;
  }
  
  export interface JournalPostsData {
    posts: Post[];
    post_topic: PostTopic;
  }
  
  export interface Post {
    id: string;
    title: string;
    text: string;
    type: string;
    current_image_name: string;
    image_path: string;
    created_at: string;
    class_id: string;
  }
  
  export interface PostTopic {
    id: string;
    title: string;
    instruction: string;
    target_num: string;
    class_id: string;
    num_access: string;
    complete_more: number;
  }
  

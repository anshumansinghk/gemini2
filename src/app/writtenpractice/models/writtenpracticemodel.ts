export interface WrittenPracticePaylaod {
    class_id:string
  }
export interface WrittenPracticeResponse {
    status: string;
    msg: string;
    data: {
      practices: Practice[];
    };
    status_code: number;
  }
  
  export interface Practice {
    title: string;
    class_written_practice_id: string;
    written_practice_id: string;
    description: string;
    class_topic_id: string | null;
    target_number: string;
    target_completed: string;
    completed_at: string;
  }
  



  export interface QuestionDetailResponse {
    status: string;
    msg: string;
    data: {
      written_practice: WrittenPractice;
      questions: Question[]; // If questions have a defined structure, replace `any` with the appropriate type.
      topic: Topic;
    };
    status_code: number;
  }
  export interface Question {
    question_id: string;
    question: string;
    type: string;
    number_option_line: string;
    is_other: string; 
    options: QuestionOption[];
  }
  
  export interface QuestionOption {
    type: string;
    option_id: string;
    option_label: string;
    other_option_label: string | null;
    user?: {
      response?: string; 
      created_at?: string;
    };
  }
  
  export interface WrittenPractice {
    written_practice_id: string;
    title: string;
    description: string;
    class_written_practice_id: string;
    pop_by_last_class: string;
    pop_by_last_entry: string;
    duplicate_practice_id: string | null;
    class_id: string;
  }
  
  export interface Topic {
    detail: TopicDetail[];
  }
  
  export type TopicDetail = {
    image?: TopicImage;
    resource?: TopicResource;
    text?: TopicText;
  };
  
  export interface TopicImage {
    id: string;
    text: string | null;
    image_id: string;
    resource_id: string | null;
    position: string;
    type: string; // Likely "IMAGE"
    title: string | null;
    path: string;
  }
  
  export interface TopicResource {
    id: string;
    text: string | null;
    image_id: string | null;
    resource_id: string;
    position: string;
    type: string; // E.g., "AUDIO", "VIDEO"
    title: string;
    path: string;
  }
  
  export interface TopicText {
    id: string;
    text: string;
    image_id: string | null;
    resource_id: string | null;
    position: string;
    type: string; // Likely "TEXT"
    title: string | null;
    path: string;
  }
  
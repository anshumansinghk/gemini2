export interface classPractices {
  data: classPracticesList;
  msg: string;
  status: string;
  status_code: 200;
}

export interface classPracticesList {
  class_practices: classPracticesListData[];
}

export interface classPracticesListData {
  completed_at: string;
  id: string;
  target_completed: number;
  target_number: number;
  title: string;
}

export interface practiceDetail {
  data: practiceDetailData;
  msg: string;
  status: string;
  status_code: number;
}

export interface practiceDetailData {
  class_id: string;
  description: string;
  instruction: string;
  practice_content: practiceContent[];
  title: string;
  type: string;
}

export interface practiceContent {
    class_practice_id: string,
    practice_resource_id: string,
    resource_id: string,
    title: string,
    type: string,
    url: string | URL,
    url_source: string | null,
    url_source_ref: string |null,
    isYouTubeUrl?:boolean,
    ytVideoId?:any
}


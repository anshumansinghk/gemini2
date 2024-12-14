export interface discussionTopics {
  status: string;
  msg: string;
  data: discussionTopicsData;
}

export interface discussionTopicsData {
  discussion_topics: discussionTopicsDetails[]
}

export interface discussionTopicsDetails {
  class_id: string,
  class_number: string,
  class_status: string,
  first_post: FirstPostDetails,
  id: string,
  instruction: string | null,
  last_post: lastPost,
  title: string,
  total_posts: number
}

export interface FirstPostDetails {
  created_at: string,
  first_name: string,
  image: string,
  is_follow: boolean,
  is_like: boolean,
  is_self_post: boolean,
  last_name: string,
  level: number,
  likes: string,
  post_id: string,
  profile_picture: string,
  text: string,
  title: string,
  total_reply: string,
  user_id: string
}
export interface lastPost {
  created_at: string,
  first_name: string,
  image: string,
  is_follow: boolean,
  is_like: boolean,
  is_self_post: boolean,
  last_name: string,
  level: number,
  likes: string,
  post_id: string,
  profile_picture: string,
  text: string,
  title: string,
  total_reply: string,
  user_id: string
}



export interface post {
  status: string;
  msg: string;
  data: discussionPostData;
  status_code: number;
}
export interface discussionPostData {
  posts: discussionPostDetails[]
  post_topic: discussionPostTopicsDetails
}
export interface discussionPostDetails {
  first_name: string,
  last_name: string,
  created_at: string,
  title: string,
  text: string,
  post_id: string,
  profile_picture: string,
  user_id: string,
  image: string,
  level: number,
  total_reply: string,
  likes: string,
  is_like: boolean,
  is_follow: boolean,
  is_self_post: boolean,
}

export interface discussionPostTopicsDetails {
  id: string,
  title: string,
  instruction: string,
}


export interface PostReplyResponse {
  status: string;
  msg: string;
  data: PostData | null;
  status_code: number;
}
export interface PostData {
  post: replyPost | undefined;
  post_topic: PostTopic;
}
export interface PostTopic {
  id: string;
  title: string;
  instruction: string;
}

export interface replyPost {
  first_name: string ;
  last_name: string;
  created_at: string;
  title: string;
  text: string;
  post_id: string;
  profile_picture: string;
  user_id: string;
  image: string;
  post_topic_default_id: string;
  level: number;
  total_reply: string;
  likes: string;
  is_like: boolean;
  is_follow: boolean;
  is_self_post: boolean;
  reply?: Reply[];
}

export interface Reply {
  first_name: string;
  last_name: string;
  created_at: string;
  title: string;
  text: string;
  post_id: string;
  profile_picture: string;
  user_id: string;
  image: string;
  level: number;
  total_reply: string;
  likes: string;
  is_like: boolean;
  is_follow: boolean;
  is_self_post: boolean;
  reply?: Reply[];
}


export interface ImageDetails {
  filename: string | null; 
  filetype: string | undefined; 
  value: string | null;
}

export interface AddPost {
  title: string |null;
  text: string;
  class_id: string |null;
  type: string;
  post_topic_default_id: string|null;
  replied_post_id: string | null;
  post_id: string | null; 
  current_image_name: string | null;
  image: ImageDetails; 
}


// add post response

export interface AddPostData {
  created_at: string;
  group_class_id: string;
  image: string |null;
  image_id: number;
  participant_id: string;
  post_id: number;
  post_topic_default_id: string;
  replied_post_id: string | null;
  text: string | null;
  title: string | null;
  type: string | null;
}

export interface AddPostApiResponse {
  data: AddPostData;
  msg: string;
  status: string;
  status_code: number;
}

//  post like 

export interface postLike {
  post_id: string;
}

export interface deletePost {
  post_id: string;
}

export interface getPostReply {
  post_id: string |number;
}
export interface postTopic {
  post_topic_id: string |number;
}

export interface deletePostResponce{
  status:string,
  msg:string,
  status_code:number
}


export interface postLikeResponce{
  status:string,
  msg:string,
  data:innerData
  status_code:number
}
export interface innerData{
  data:innerData2
}
export interface innerData2{
  liked:boolean
}

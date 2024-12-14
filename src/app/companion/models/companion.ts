export interface UserDetails {
  data: UserDataDetails;
  status: string;
  status_code: number;
}

export interface UserDataDetails {
  age: string;
  companion_id: string;
  created_at: string;
  customer_id: string | null;
  email: string;
  encrypt_username: string;
  first_name: string;
  fullname: string;
  id: string;
  is_active: string;
  is_email_verified: string;
  last_name: string;
  login_attempts: string;
  organization: string | null;
  participant_id: string;
  password_created: boolean;
  profile_picture: string | URL;
  updated_at: string | null;
  user_type: string;
  username: string;
}

export interface CompanionDashboardData {
  data: CompanionDashboardDetail;
  msg: string;
  status: string;
  status_code: number;
}

export interface CompanionDashboardDetail {
  group: GroupDetail;
  is_companion_site: boolean;
  resources: Resources[];
}

export interface Resources {
  path: string | URL;
  resource_id: string;
  title: string;
  type: string;
  url: string | URL;
  isYouTubeUrl?:string,
  ytVideoId?:any
}

export interface GroupDetail {
  course_id: string;
  id: string;
  name: string;
  participant: GroupDetailParticipant;
  schedule: GroupDetailSchedule;
}

export interface GroupDetailParticipant {
  group_id: string;
}

export interface GroupDetailSchedule {
  class_id: string;
  class_number: string;
  class_title: string;
  group_id: string;
  group_schedule_id: string;
  overview: string;
}

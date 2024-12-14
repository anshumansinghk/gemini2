export interface IContactUsResponse 
{
    msg: string;
    status: string;
    status_code : number;
}

export interface IContactUsRequest {
    name: string;
    email: string;
    phone_number:string;
    message:string;
}

export interface UserDetails{
    data:UserDetailsData,
    status:string,
    status_code:number
}

export interface UserDetailsData {
    city: string;
    country: string;
    created_at: string;
    customer_id: string;
    email: string;
    encrypt_username: string;
    first_name: string;
    fullname: string;
    gender: string | null;
    id: string;
    insurance_info: string;
    is_active: string;
    is_email_verified: string;
    last_name: string;
    login_attempts: string;
    mrn: string;
    organization: string;
    p_sub_id: string;
    p_sub_id_created_at: string;
    participant_id: string;
    password_created: boolean;
    phone_number: string;
    primary_care_provider: string;
    profile_picture: string;
    state: string;
    street: string;
    subject_id: string;
    timezone: string;
    updated_at: string;
    user_type: string;
    username: string;
    zip_code: string;
}

export interface ContactUsMessage{
    name: string;
    phone_number: string;
    email: string;
    message: string;
}

export interface ContactUsRes{
    msg:string,
    status:string,
    status_code:number
}

export interface SaveUserProfile {
    username: string;
    email: string;
    current_password: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    zip_code: string;
    phone_number: string;
    timezone: string;
    current_image_name: string;
    profile_picture: ProfilePicture;
}
  
export interface ProfilePicture {
    filename: string;
    filetype: string;
    value: string;
}

export interface SaveUserProfileRes{
    msg:string,
    status:string,
    status_code:number
}
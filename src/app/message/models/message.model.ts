export interface MessageReceiverId {
    receiver_user_id: string;
}

export interface BuddyDetail {
    fullname: string;
    receiver_user_id: string | null;
    profile_picture: string;
}

export interface BuddyMessage {
    id: string;
    message: string;
    created_at: string;
    sender_id: string | null;
    receiver_user_id: string | null;
    reading_datetime: string;
    message_format: string;
}

export interface BuddyMessages {
    total_message: number;
    buddy_detail: BuddyDetail;
    buddy_messages: BuddyMessage[]; // Updated to be an array of BuddyMessage
}

export interface GetMessageResponse {
    msg: string;
    status: string;
    status_code: number;
    data: BuddyMessages;
}

export interface SendMessageRequest {
    receiver_user_id: string;
    message: string;
}

export interface SendMessageResponse {
    msg: string;
    status: string;
    status_code: number;
    data: [];
}
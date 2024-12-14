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


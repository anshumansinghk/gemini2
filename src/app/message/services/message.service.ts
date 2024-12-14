import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetMessageResponse, MessageReceiverId, SendMessageRequest, SendMessageResponse } from '../models/message.model';
import { ApiService } from 'src/app/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private apiService: ApiService) { }

  getMessages(data:MessageReceiverId): Observable<GetMessageResponse> {
    return this.apiService.post(
        "message/buddy-message",
        data,
        true
    );
  }

  sendMessage(data:SendMessageRequest): Observable<SendMessageResponse> {
    return this.apiService.post(
        "message/add-message",
        data,
        true
    );
  }
}

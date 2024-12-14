import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { MessageReceiverId, SendMessageRequest } from '../models/message.model';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared';
import { HeaderService } from 'src/app/header/header.service';

@Component({
  selector: 'ss-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent {
  receiverUserId: string = ''; 
  buddy_detail: any; 
  buddy_messages: any[] = []; 
  messageContent: string = '';
  intervalId: any;

  constructor(private route: ActivatedRoute,
    private messageService: MessageService,
    private alerter: AlertService,
    private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.setBack('../');
    this.headerService.setShowFooter(false);
    this.route.params.subscribe(params => {
      this.receiverUserId = params['id']; 
      this.getMessageList();

      this.intervalId = setInterval(() => {
        this.getMessageList();
      }, 5000);
    });
  }

  getMessageList() {
    const message: MessageReceiverId = { receiver_user_id: this.receiverUserId };
    this.messageService.getMessages(message).subscribe(
      res => {
        if (res.status == "success") {
          this.buddy_detail = res.data.buddy_detail; 
          this.buddy_messages = res.data.buddy_messages; 
          // this.alerter.showSuccess(res.msg, true, true, false);
        } else {
          this.alerter.showError(res.msg, true, true, false);
        }
      },
      err => {
      }
    );
  }

  sendMessage() {
    if (this.messageContent.trim()) {
      const message: SendMessageRequest = { receiver_user_id: "", message: this.messageContent };
      this.messageService.sendMessage(message).subscribe(
        res => {
          if (res.status == "success") {
            this.getMessageList();
            // this.alerter.showSuccess(res.msg, true, true, false);
          } else {
            this.alerter.showError(res.msg, true, true, false);
          }
        },
        err => {
        }
      );

      this.messageContent = '';
    }
  }

  timePassed(date: Date): string {
    const now = new Date();
    const secondsPassed = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

    if (secondsPassed < 60) {
      return `${secondsPassed} seconds ago`;
    } else if (secondsPassed < 3600) {
      const minutesPassed = Math.floor(secondsPassed / 60);
      return `${minutesPassed} minutes ago`;
    } else if (secondsPassed < 86400) {
      const hoursPassed = Math.floor(secondsPassed / 3600);
      return `${hoursPassed} hours ago`;
    } else {
      const daysPassed = Math.floor(secondsPassed / 86400);
      return `${daysPassed} days ago`;
    }
  }
  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    this.headerService.setShowFooter(true);
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

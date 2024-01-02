import { Component, OnInit } from '@angular/core';
import { Message } from '../Models/Message';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-get-all-messages',
  templateUrl: './get-all-messages.component.html',
  styleUrls: ['./get-all-messages.component.css']
})
export class GetAllMessagesComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.messageService.getAllMessages().subscribe(
      (data) => {
        this.messages = data;
      },
      (error) => {
        console.error('Error loading messages:', error);
      }
    );
  }
}
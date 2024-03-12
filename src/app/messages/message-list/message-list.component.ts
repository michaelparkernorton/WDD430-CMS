import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  private subscription: Subscription

  constructor(private messageService: MessageService,
    private contactService: ContactService) {
    this.messageService.getMessages()
    this.contactService.getContacts()
  }

  ngOnInit() {
    this.subscription = this.messageService.messageListChangedEvent
      .subscribe((messageList: Message[]) => {
          this.messages = messageList
        }
      )
  }
}

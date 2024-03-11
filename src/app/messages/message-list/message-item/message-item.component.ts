import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../message.model';
import { Contact } from '../../../contacts/contact.model';
import { ContactService } from '../../../contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css',
  providers: [ContactService],
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;

  messageSender: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    const contact: Contact = this.contactService.getContact(
      this.message.sender
    );


    if (contact == null) {
      this.messageSender = 'Null';
    } else {
      this.messageSender = contact.name;
    }
  }
}

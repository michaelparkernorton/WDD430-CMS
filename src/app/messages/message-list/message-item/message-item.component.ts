import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../message.model';
import { Contact } from '../../../contacts/contact.model';
import { ContactService } from '../../../contacts/contact.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css',
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;

  messageSender: string;
  contacts: Contact[];
  private subcriptionContact: Subscription;

  constructor(private contactService: ContactService) {}

  ngOnInit() {

    this.subcriptionContact = this.contactService.contactListChangedEvent.subscribe(
      (contactList: Contact[]) => {
        this.contacts = contactList;

        const contact: Contact = this.contactService.getContact(
          this.message.sender
        );
        if (contact == null) {
          this.messageSender = 'Null';
        } else {
          this.messageSender = contact.name;
        }
      }
    );
  }
}

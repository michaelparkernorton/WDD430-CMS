import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  @Output() contactWasSelected = new EventEmitter<Contact>();

  

  onContactSelected(contact: Contact) {
    this.contactWasSelected.emit(contact);
  }
}
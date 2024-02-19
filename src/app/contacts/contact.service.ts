import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>()
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  private contacts: Contact[] = []
  private maxContactId: number
  private contactsListClone: Contact[]

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId()
  }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string) {
    return this.contacts.find((contact) => contact.id === id);
  }

  /**
   * getMaxId
   */
  public getMaxId(): number {
    let maxId = 0
    let currentId = 0
    this.contacts.forEach(contact => {
      currentId = +contact.id
      if (currentId > maxId) {
        maxId = currentId
      }
    })
    return maxId
  }

  /**
   * addContact
   */
  public addContact(newContact: Contact) {
    if (!newContact) {
      return
    }
    this.maxContactId++
    newContact.id = this.maxContactId.toString()
    this.contacts.push(newContact)
    this.contactsListClone = this.contacts.slice()
    this.contactListChangedEvent.next(this.contactsListClone)
  }

  /**
   * updateContact
   */
  public updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return
    }
    const pos = this.contacts.indexOf(originalContact)
    if (pos < 0) {
      return
    }
    newContact.id = originalContact.id
    this.contacts[pos] = newContact
    this.contactsListClone = this.contacts.slice()
    this.contactListChangedEvent.next(this.contactsListClone)
  }

  /**
   * deleteContact
   */
  public deleteContact(contact: Contact) {
    if(!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact)
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1)
    this.contactsListClone = this.contacts.slice()
    this.contactListChangedEvent.next(this.contactsListClone)
  }
}

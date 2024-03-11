import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  private json: string

  constructor(private http: HttpClient) {
    this.maxContactId = this.getMaxId()
  }

  getContacts() {
    this.http.get('https://michaelnorton-cms-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        //success method
        {next: (contacts: Contact[]) => {
        this.contacts = contacts
        this.maxContactId = this.getMaxId()
        // sort the list of documents
        this.contacts.sort(this.compareFn)
        // emit the next document list change event
        this.contactsListClone = this.contacts.slice()
        this.contactListChangedEvent.next(this.contactsListClone);
        },
        // error method
        error: (e) => {
          console.log(e)
        }}
      )
  }

  compareFn(a, b) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    // a must be equal to b
    return 0;
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

  storeContacts() {
    this.json = JSON.stringify(this.contacts)
    this.http.put('https://michaelnorton-cms-default-rtdb.firebaseio.com/contacts.json', this.json)
      .subscribe(()=> {
        this.contactsListClone = this.contacts.slice()
        this.contactListChangedEvent.next(this.contactsListClone)
      })
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
    this.storeContacts()
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
    this.storeContacts()
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
    this.storeContacts()
  }
}

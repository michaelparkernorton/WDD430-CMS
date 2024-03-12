import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { Contact } from '../contacts/contact.model';
import { ContactService } from '../contacts/contact.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageListChangedEvent = new Subject<Message[]>();

  private messages: Message[] = [];
  private maxMessageId: number;
  private messagesListClone: Message[];
  private json: string;
  contacts: Contact[];
  private subcriptionContact: Subscription;
  constructor(
    private http: HttpClient,
    private contactService: ContactService
  ) {
    this.maxMessageId = this.getMaxId();
  }

  getMessages() {
    this.http
      .get(
        'https://michaelnorton-cms-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe(
        //success method
        {
          next: (messages: Message[]) => {
            this.messages = messages;
            this.maxMessageId = this.getMaxId();
            // sort the list of messages
            this.messages.sort(this.compareFn);
            // emit the next message list change event
            this.messagesListClone = this.messages.slice();
            this.messageListChangedEvent.next(this.messagesListClone);
          },
          // error method
          error: (e) => {
            console.log(e);
          },
        }
      );
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

  getMessage(id: string) {
    return this.messages.find((message) => message.id === id);
  }

  /**
   * getMaxId
   */
  public getMaxId(): number {
    let maxId = 0;
    let currentId = 0;
    this.messages.forEach((message) => {
      currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  storeMessages() {
    this.json = JSON.stringify(this.messages);
    this.http
      .put(
        'https://michaelnorton-cms-default-rtdb.firebaseio.com/messages.json',
        this.json
      )
      .subscribe(() => {
        this.messagesListClone = this.messages.slice();
        this.messageListChangedEvent.next(this.messagesListClone);
      });
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return
    }
    this.maxMessageId++
    newMessage.id = this.maxMessageId.toString()
    newMessage.sender = "19"
    this.messages.push(newMessage)
    this.storeMessages()
  }
}

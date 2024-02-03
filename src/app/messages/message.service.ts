import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string){
    this.messages.forEach(message => {
      if (message.id == id) {
        return message;
      }
    });
    return null;
  }
}

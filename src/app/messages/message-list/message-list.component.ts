import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', "math", "I need help", "bob"),
    new Message('1', "pizza", "I am hungry", "mike"),
    new Message('1', "korean drama", "I love this show", "Sara"),
  ];

  constructor() {}

  ngOnInit(): void {
    
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}

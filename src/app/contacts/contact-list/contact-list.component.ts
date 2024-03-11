import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];
  private subcription: Subscription;
  term: string;
  filteredName: "";

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contactService.getContacts()
  }

  ngOnInit() {
    this.subcription = this.contactService.contactListChangedEvent.subscribe(
      (contactList: Contact[]) => {
        this.contacts = contactList;
      }
    );
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  search(value: string) {
    this.term = value;
  }
}

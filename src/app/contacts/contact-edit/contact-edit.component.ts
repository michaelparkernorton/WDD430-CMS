import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent {
  groupContacts: any;
  originalContact: Contact;
  contact: Contact;
  editMode: boolean = false;
  id: string;
  value: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(this.id);
      if (!this.originalContact) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.contact.group) {
        this.contact.group = JSON.parse(JSON.stringify(this.originalContact.group));
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    this.contact = new Contact(
      value.id,
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      value.group
    );
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, this.contact);
    } else {
      this.contactService.addContact(this.contact);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

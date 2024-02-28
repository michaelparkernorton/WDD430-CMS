import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: string;
  value: string;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

//   onSubmit(form: NgForm) {
//     value = form.value // get values from form’s fields
//     newDocument = new Document()
//     Assign the values in the form fields to the
//     corresponding properties in the newDocument
//     if (editMode = true) then
//      documentService.updateDocument(originalDocument, newDocument)
//     else
//      documentService.addDocument(newDocument)
//     endIf
//     route back to the '/documents' URL 
//  }

  onSubmit(form: NgForm) {
    const value = form.value
    this.document = new Document(value.id, value.name, value.desciption, value.url)
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, this.document)
    } else {
      this.documentService.addDocument(this.document);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(this.id);
      if (!this.originalDocument) {
        return;
      }
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}

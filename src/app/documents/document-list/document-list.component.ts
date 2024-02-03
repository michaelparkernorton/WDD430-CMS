import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  document: Document[] = [
    new Document('1', 'Doc1', 'description1', 'url'),
    new Document('2', 'Doc2', 'description2', 'url'),
    new Document('3', 'Doc3', 'description3', 'url'),
    new Document('4', 'Doc4', 'description4', 'url'),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}

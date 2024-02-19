import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>()
  documentSelectedEvent = new EventEmitter<Document>()
  documentChangedEvent = new EventEmitter<Document[]>()
  
  private documents: Document[] = []
  private maxDocumentId: number;
  private documentsListClone: Document[]

  constructor() {
    this.documents = MOCKDOCUMENTS
    this.maxDocumentId = this.getMaxId()
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string){
    return this.documents.find((document) => document.id === id);
  }

  /**
   * getMaxId
   */
  public getMaxId(): number {
    let maxId = 0
    let currentId = 0
    this.documents.forEach(document => {
      currentId = +document.id
      if (currentId > maxId) {
        maxId = currentId
      }
    });
    return maxId
  }

  /**
   * addDocument
   */
  public addDocument(newDocument: Document) {
    if (!newDocument) {
      return
    } 
    this.maxDocumentId++
    newDocument.id = this.maxDocumentId.toString()
    this.documents.push(newDocument)
    this.documentsListClone = this.documents.slice()
    this.documentListChangedEvent.next(this.documentsListClone)
  }

  /**
   * updateDocument
   */
  public updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return
    }
    let pos = this.documents.indexOf(originalDocument)
    if (pos < 0) {
      return
    }
    newDocument.id = originalDocument.id
    this.documents[pos] = newDocument
    this.documentsListClone = this.documents.slice()
    this.documentListChangedEvent.next(this.documentsListClone)
  }

  /**
   * deleteDocument
   */
  public deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document)
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1)
    this.documentsListClone = this.documents.slice()
    this.documentListChangedEvent.next(this.documentsListClone)
  }
}

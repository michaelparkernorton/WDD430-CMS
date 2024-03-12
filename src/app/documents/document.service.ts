import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>()
  documentSelectedEvent = new EventEmitter<Document>()
  documentChangedEvent = new EventEmitter<Document[]>()
  startedEditing = new Subject<number>();
  
  private documents: Document[] = []
  private maxDocumentId: number;
  private documentsListClone: Document[]
  private json: string;

  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId()
  }

  getDocuments() {
    this.http.get('https://michaelnorton-cms-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        //success method
        {next: (documents: Document[]) => {
        this.documents = documents
        this.maxDocumentId = this.getMaxId()
        // sort the list of documents
        this.documents.sort(this.compareFn)
        // emit the next document list change event
        this.documentsListClone = this.documents.slice()
        this.documentListChangedEvent.next(this.documentsListClone);
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

  storeDocuments() {
    this.json = JSON.stringify(this.documents)
    this.http.put('https://michaelnorton-cms-default-rtdb.firebaseio.com/documents.json', this.json)
      .subscribe(()=> {
        this.documentsListClone = this.documents.slice()
        this.documentListChangedEvent.next(this.documentsListClone)
      })
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
    this.storeDocuments()
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
    this.storeDocuments()
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
    this.storeDocuments()
  }
}

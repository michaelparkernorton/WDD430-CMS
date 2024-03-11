import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = []
  private subscription: Subscription

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.documentService.getDocuments();
  }

  ngOnInit() {
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe((documentList: Document[]) => {
          this.documents = documentList
        }
      )
  }

  /**
   * ngOnDestroy
   */
  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
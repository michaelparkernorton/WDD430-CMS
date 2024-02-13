import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }

  onSelected(document: Document) {
  
    this.router.navigate([document.id], {relativeTo: this.route})
  }
}

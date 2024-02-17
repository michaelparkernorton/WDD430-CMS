import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css',
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: string;
  nativeWindow: any;

  constructor(private documentService: DocumentService,
    private windowRefService: WindRefService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit() {
    this.nativeWindow = this.windowRefService.getNativeWindow();
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.document = this.documentService.getDocument(this.id);          
        }
      )
  }  

  /**
   * onView
   */
  public onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url)
    }
  }

  /**
   * onDelete
   * route back to the /documents URL
   */
  public onDelete() {
    this.documentService.deleteDocument(this.document)
  }
}

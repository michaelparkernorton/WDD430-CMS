import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
onSubmit(_t4: any) {
throw new Error('Method not implemented.');
}
  
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onCancel() {
    throw new Error('Method not implemented.');
  }

}

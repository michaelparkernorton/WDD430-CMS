import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/documents' },
  // { path: 'documents', component: DocumentsComponent, children: [
  //   { path: '', component: RecipeStartComponent },
  //   { path: 'new', component: RecipeEditComponent },
  //   { path: ':id', component: RecipeDetailComponent },
  //   { path: ':id/edit', component: RecipeEditComponent },
  // ] },
  { path: 'documents', component: DocumentsComponent },
  { path: 'messages', component: MessageListComponent },
  { path: 'contacts', component: ContactsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

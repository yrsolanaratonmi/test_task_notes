import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NoteViewComponent} from './note-view/note-view.component';
import {NoteNewComponent} from './note-new/note-new.component';
import {isNoteExistsGuard} from './is-note-exists.guard';

const routes: Routes = [
  {
    path: 'new', component: NoteNewComponent
  },
  {
    path: ':id', component: NoteViewComponent, canActivate: [isNoteExistsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

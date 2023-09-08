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
    path: 'edit/:id', component: NoteNewComponent // переписать с ng-content на человеческое определение по роутингу (типа - брать из роута edit или new и в зависимости от этого цеплять заметку из стора и рисовать кнопку)
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

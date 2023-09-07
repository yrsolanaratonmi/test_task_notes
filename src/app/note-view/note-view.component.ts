import { Component, Input } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, Observable, switchMap, tap} from 'rxjs';
import {map} from 'rxjs/internal/operators/map';
import {Store} from '@ngxs/store';
import {Note, NotesState, RemoveNote} from '../store/notes.state';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewComponent {
  constructor(private router: Router, private readonly store: Store) {}

  note$: Observable<Note> = this.router.events.pipe(
    map((route: any) => +route.url?.slice(1) || +route.routerEvent?.url?.slice(1)),
    switchMap(routeId => this.store.select(NotesState).pipe(
      map((notes: Array<Note>) => notes.find((note: Note) => note.id === routeId) as Note)
    )),

    )

  isEditing$ = new BehaviorSubject(false)

  // ngOnInit(): void {
  //   this.note$.subscribe(console.warn)
  // }

  remove (noteId?: number) {
    this.store.dispatch(new RemoveNote(noteId || 0))
    this.router.navigate([''])
  }

  edit (noteId?: number) {
    this.isEditing$.next(true)
  }

  closeEdit() {
    this.isEditing$.next(false)
    this.router.navigate([''])
  }

  ngOnDestroy(): void {
    this.isEditing$.next(false)
  }
}

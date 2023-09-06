import { Component, Input } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, Observable, switchMap, tap} from 'rxjs';
import {map} from 'rxjs/internal/operators/map';
import {Note, NotesService} from '../notes.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewComponent {
  constructor(private router: Router, private route: ActivatedRoute, private notesService: NotesService) {}

  note$!: Observable<Note>;
  isEditing$ = new BehaviorSubject(false)

  ngOnInit(): void {
    this.note$ = this.router.events.pipe(
      map((route: any) =>  +route.url?.slice(1) || +route.routerEvent?.url?.slice(1)),
      switchMap(routeId => this.notesService.getSingleNote(routeId)),
    )
  }

  remove (noteId?: number) {
    this.notesService.removeNote(noteId || 0)
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

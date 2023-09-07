import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/internal/operators/map';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Observable, filter, switchMap} from 'rxjs';
import {Store} from '@ngxs/store';
import {AddNote, EditNote, Note, NotesState} from '../store/notes.state';

@Component({
  selector: 'app-note-new',
  templateUrl: './note-new.component.html',
  styleUrls: ['./note-new.component.scss']
})
export class NoteNewComponent {

  @ContentChild('save') public save! : ElementRef;

  public noteData = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  id = this.route.snapshot.params['id'];

  constructor (private readonly store: Store, private readonly router: Router, private readonly route: ActivatedRoute) {}

  private notes$ = this.store.select(NotesState)

  ngOnInit(): void {
    this.getSingle()
    this.router.events.pipe(
      map((route: any) => +route.url?.slice(1) || +route.routerEvent?.url?.slice(1)),
      switchMap(routeId => {
        this.id = routeId
        return this.store.select(NotesState).pipe(
          map((notes: Array<Note>) => notes.find((note: Note) => note.id === routeId))
        )
      }),
    ).subscribe(res => {
      this.noteData.controls.title.setValue(res?.title as string)
      this.noteData.controls.description.setValue(res?.description as string)
    })
  }

  getSingle () {
    this.store.select(NotesState).pipe(
      map((notes: Array<Note>) => notes.find((note: Note) => note.id === +this.id))
    ).subscribe(res => {
      this.noteData.controls.title.setValue(res?.title as string)
      this.noteData.controls.description.setValue(res?.description as string)
    })
  }

  saveNew() {
    const data: any = {}
    this.notes$.pipe(
      map(notes => {
        data.id = notes.length ? (notes.at(-1) as any).id  + 1 : 1
      })
    ).subscribe().unsubscribe()
    const { title, description } = this.noteData.value
    data.title = title
    data.description = description
    data.created = new Date()
    this.store.dispatch(new AddNote(data))
    this.router.navigate([data.id])
  }

  saveEdit() {
    const {title, description} = this.noteData.value
    const id = +this.id
    const created = new Date()
    const data = { id, title, description, created }
    this.store.dispatch(new EditNote(data as Note))
    this.router.navigate([''])
  }
}

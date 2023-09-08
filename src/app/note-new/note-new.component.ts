import { Component, ContentChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/internal/operators/map';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Observable, filter, switchMap} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {AddNote, EditNote, Note, NotesState} from '../store/notes.state';

@Component({
  selector: 'app-note-new',
  templateUrl: './note-new.component.html',
  styleUrls: ['./note-new.component.scss']
})
export class NoteNewComponent {

  @ContentChild('save') public save! : ElementRef;

  @Select(NotesState) notes$!: Observable<Array<Note>>

  @Output() close = new EventEmitter()

  public noteData = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    file: new FormControl(null)
  })

  file: any;

  id = this.route.snapshot.params['id'];

  isEditing = this.route.snapshot.routeConfig?.path?.includes('edit')

  constructor (private readonly store: Store, private readonly router: Router, private readonly route: ActivatedRoute) {}


  ngOnInit(): void {
    this.getSingle()
    this.router.events.pipe(
      map((route: any) => +route.url?.slice(1) || +route.routerEvent?.url?.slice(1)),
      switchMap(routeId => {
        this.id = routeId
        return this.notes$.pipe(
          map((notes: Array<Note>) => notes.find((note: Note) => note.id === routeId))
        )
      }),
    ).subscribe(res => {
      this.noteData.controls.title.setValue(res?.title as string)
      this.noteData.controls.description.setValue(res?.description as string)
      this.noteData.controls.file.setValue(res?.file)
      this.file = res?.file
    })
  }

  getSingle () {
    this.notes$.pipe(
      map((notes: Array<Note>) => notes.find((note: Note) => note.id === +this.id))
    ).subscribe(res => {
      this.noteData.controls.title.setValue(res?.title as string)
      this.noteData.controls.description.setValue(res?.description as string)
      this.noteData.controls.file.setValue(res?.file)
      this.file = res?.file
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
    data.file = this.file;
    data.created = new Date()
    this.store.dispatch(new AddNote(data))
    this.router.navigate([data.id])
    this.close.emit()
  }

  saveEdit() {
    const {title, description} = this.noteData.value
    const id = +this.id
    const created = new Date()
    const file = this.file
    const data = { id, title, description, created, file }
    this.store.dispatch(new EditNote(data as Note))
    this.router.navigate([id])
    this.close.emit()
  }

  onFileChange() {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent) => {
      this.file = (event.target as any).result
    };

    reader.readAsDataURL(this.noteData.controls.file.value as any);
  }

  removeFile() {
    this.noteData.controls.file.setValue(null)
  }
}

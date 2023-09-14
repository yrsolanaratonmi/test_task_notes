import { Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/internal/operators/map';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject, catchError, takeUntil} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {AddNote, EditNote, Note, NotesState} from '../store/notes.state';

@Component({
  selector: 'app-note-new',
  templateUrl: './note-new.component.html',
  styleUrls: ['./note-new.component.scss'],
})
export class NoteNewComponent implements OnInit, OnDestroy{

  @Select(NotesState) notes$!: Observable<Array<Note>>;

  private readonly destroy$ = new Subject()

  _note!: Note;

  get note () {
    return this._note;
  }

  set note (note: Note) {
    this.noteData.controls.title.setValue(note.title)
    this.noteData.controls.description.setValue(note.description)
    this.noteData.controls.fileData.setValue(note.fileData)
    this.file = note.file
    this._note = note
  };

  noteData: FormGroup<{title: FormControl<string>, description: FormControl<string>, fileData: FormControl<null>}> = new FormGroup({
    title: new FormControl('', Validators.required) as FormControl<string>,
    description: new FormControl('', Validators.required) as FormControl<string>,
    fileData: new FormControl(null),
  })

  file!: File | null;

  id = +this.route.snapshot.params['id'];

  isEditing = this.route.snapshot.routeConfig?.path?.includes('edit')

  constructor (private readonly store: Store, private readonly router: Router, private readonly route: ActivatedRoute) {}


  ngOnInit(): void {
    if (this.isEditing) {
      this.getSingle()
    }
  }

  getSingle () {
    this.notes$.pipe(
      takeUntil(this.destroy$),
      map((notes: Array<Note>) => notes.find((note: Note) => note.id === this.id) as Note),
    ).subscribe((res: Note) => {
      this.note = res
    })
  }

  saveNew() {
    const data: Partial<Note> = {
      title: this.noteData.controls.title.value as string,
      description: this.noteData.controls.description.value as string,
      fileData: this.noteData.controls.fileData.value
    }
    this.notes$.pipe(
      takeUntil(this.destroy$),
      map(notes => {
        data.id = notes.length ? (notes.at(-1) as Note).id  + 1 : 1
      })
    ).subscribe()
    data.file = this.file;
    data.created = new Date()
    this.store.dispatch(new AddNote(data as Note))
    this.router.navigate([data.id])
  }

  saveEdit() {
    const {title, description} = this.noteData.value
    const id = +this.id
    const created = this.note.created
    const file = this.file
    const fileData = this.noteData.controls.fileData.value
    const data = { id, title, description, created, file, fileData }
    this.store.dispatch(new EditNote(data as Note))
    this.router.navigate([id])
  }

  onFileChange() {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent) => {
      this.file = (event.target as any).result
    };

    reader.readAsDataURL(this.noteData.controls.fileData.value as any);
  }

  removeFile() {
    this.noteData.controls.fileData.setValue(null)
    this.file = null
  }

  onClose() {
    this.router.navigate([+this.id])
  }

  ngOnDestroy(): void {
    this.destroy$.next(null)
    this.destroy$.complete()
  }
}

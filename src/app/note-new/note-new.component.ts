import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Note, NotesService} from '../notes.service';
import {map} from 'rxjs/internal/operators/map';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Observable, filter, switchMap} from 'rxjs';

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

  constructor (private notesService: NotesService, private readonly router: Router, private readonly route: ActivatedRoute) {}

  private notes$ = this.notesService.notes$;

  ngOnInit(): void {
    this.getSingle()
    this.router.events.pipe(
      map((route: any) => +route.url?.slice(1) || +route.routerEvent?.url?.slice(1)),
      switchMap(routeId => {
        this.id = routeId
        return this.notesService.getSingleNote(routeId)
      }),
    ).subscribe(res => {
      this.noteData.controls.title.setValue(res?.title)
      this.noteData.controls.description.setValue(res?.description)
    })
  }

  getSingle () {
    this.notesService.getSingleNote(+this.id).subscribe(res => {
      this.noteData.controls.title.setValue(res?.title)
      this.noteData.controls.description.setValue(res?.description)
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
    this.notesService.addNote(data)
    this.router.navigate([data.id])
  }

  saveEdit() {
    const {title, description} = this.noteData.value
    const id = +this.id
    const created = new Date()
    const data = { id, title, description, created }
    this.notesService.editNote(data as Note)
    this.router.navigate([''])

  }
}

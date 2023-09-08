import { Select, Store } from '@ngxs/store';
import { Component } from '@angular/core';
import {Note, NotesState} from '../store/notes.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor (private readonly store: Store) {}

  @Select(NotesState) notes$!: Observable<Array<Note>>
}

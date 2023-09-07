import { Store } from '@ngxs/store';
import { Component } from '@angular/core';
import {NotesState} from '../store/notes.state';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor (private readonly store: Store) {}

  notes$ = this.store.select(NotesState)
}

import { Component } from '@angular/core';
import {NotesService} from '../notes.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor (private readonly notesService: NotesService) {}

  notes$ = this.notesService.getNotes()

  ngOnInit(): void {
  }
}

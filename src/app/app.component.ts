import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'notes';

  constructor(private readonly router: Router) {}

  addNote() {
    this.router.navigate(['/new'])
  }
}

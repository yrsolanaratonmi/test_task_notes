import { TuiRootModule, TuiDialogModule, TuiAlertModule, TuiSvgModule, TuiButtonModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { NoteViewComponent } from './note-view/note-view.component';
import {TuiActionModule, TuiInputComponent, TuiInputModule, TuiIslandModule, TuiTextAreaModule} from "@taiga-ui/kit";
import {TuiLetModule} from "@taiga-ui/cdk";
import { NoteNewComponent } from './note-new/note-new.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    NoteViewComponent,
    NoteNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiActionModule,
    TuiLetModule,
    TuiIslandModule,
    FormsModule,
    ReactiveFormsModule,
    TuiTextAreaModule,
    TuiInputModule,
    TuiTextfieldControllerModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

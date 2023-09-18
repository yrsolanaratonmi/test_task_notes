import { TuiRootModule, TuiDialogModule, TuiAlertModule, TuiSvgModule, TuiButtonModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { NoteViewComponent } from './note-view/note-view.component';
import {TuiActionModule, TuiInputComponent, TuiInputFilesModule, TuiInputModule, TuiIslandModule, TuiTextAreaModule} from "@taiga-ui/kit";
import {TuiLetModule} from "@taiga-ui/cdk";
import { NoteNewComponent } from './note-new/note-new.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxsModule} from "@ngxs/store";
import {NotesState} from "./store/notes.state";
import {NgxsStoragePluginModule, StorageOption} from '@ngxs/storage-plugin';
import {LOCAL_STORAGE_ENGINE} from '@ngxs/storage-plugin';
import { NoteEditComponent } from './note-edit/note-edit.component';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import { NoNoteChosenComponent } from './no-note-chosen/no-note-chosen.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    NoteViewComponent,
    NoteNewComponent,
    NoteEditComponent,
    NoNoteChosenComponent,
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
    TuiTextfieldControllerModule,
    TuiInputFilesModule,
    TuiDialogModule,
    NgxsModule.forRoot([NotesState]),
    NgxsStoragePluginModule.forRoot({
      key: NotesState,
    }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

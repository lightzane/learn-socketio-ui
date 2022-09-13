import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatsComponent } from './chat/chat.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './chat/components/header/header.component';
import { FooterComponent } from './chat/components/footer/footer.component';
import { AddRoomDialogComponent } from './chat/components/add-room-dialog/add-room-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { EnterNameDialogComponent } from './chat/components/enter-name-dialog/enter-name-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatsComponent,
    HeaderComponent,
    FooterComponent,
    AddRoomDialogComponent,
    EnterNameDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

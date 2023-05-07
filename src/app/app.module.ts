import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterOutlet} from "@angular/router";
import { NumberPipePipe } from './number-pipe.pipe';
import { AppRoutingModule } from './app-routing.module';
import { MovieCreationComponent } from './movie-creation/movie-creation.component';
import {NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { MovieDisplayComponent } from './movie-display/movie-display.component';
import {FlexModule} from "@angular/flex-layout";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { MovieUpdateComponent } from './movie-update/movie-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberPipePipe,
    MovieCreationComponent,
    MovieDisplayComponent,
    MovieUpdateComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    FlexModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

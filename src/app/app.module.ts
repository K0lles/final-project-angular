import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterOutlet} from "@angular/router";
import { NumberPipePipe } from './number-pipe.pipe';
import { AppRoutingModule } from './app-routing.module';
import { MovieCreationComponent } from './movie-creation/movie-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberPipePipe,
    MovieCreationComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

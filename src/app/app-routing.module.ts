import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MovieCreationComponent} from "./movie-creation/movie-creation.component";
import {MovieDisplayComponent} from "./movie-display/movie-display.component";
import {MovieUpdateComponent} from "./movie-update/movie-update.component";

const routes: Routes = [
  {path: 'create', component: MovieCreationComponent},
  {path: 'update/:id', component: MovieUpdateComponent},
  {path: '', component: MovieDisplayComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

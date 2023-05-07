import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {
    const movies = [
      {
        id: '1',
        name: 'Batman',
        //photo: 'https://plus.unsplash.com/premium_photo-1672907030852-3eb140df586f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        year_of_release: 2021,
        box_office: 2000000,
        created_at: new Date(2023, 4, 21)
      },
      {
        id: '2',
        name: 'Spider',
        //photo: 'https://plus.unsplash.com/premium_photo-1672907030852-3eb140df586f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        year_of_release: 2021,
        box_office: 2000000,
        created_at: new Date(2023, 4, 21)
      },
      {
        id: '3',
        name: 'Groom',
        //photo: 'https://plus.unsplash.com/premium_photo-1672907030852-3eb140df586f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        year_of_release: 2021,
        box_office: 2000000,
        created_at: new Date(2023, 4, 21)
      },
      {
        id: '4',
        name: 'Will',
        //photo: 'https://plus.unsplash.com/premium_photo-1672907030852-3eb140df586f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        year_of_release: 2021,
        box_office: 2000000,
        created_at: new Date(2023, 4, 21)
      }

    ]

    let parsed_movies = JSON.stringify(movies);
    localStorage.setItem('movies', parsed_movies);
    this.initializeMovies();
  }

  private initializeMovies(): void {
    const movies = JSON.parse(localStorage.getItem('movies') || '[]');
    this.movies.next(movies);
  }

  get getMovies(): any {
    return this.movies.asObservable();
  }

  public addMovie(movie: any): Observable<any> {
    const movies = this.movies.getValue();
    movies.push(movie);
    this.updateMoviesInLocalStorage(movies);
    return of("Successfully created!");
  }

  public updateUser(movie: any): Observable<any> {
    const movies = this.movies.getValue();
    const index = movies.findIndex(u => u.id === movie.id);
    for (const key in movie) {
      if (key in movies[index]) {
        movies[index][key] = movie[key];
      }
    }
    this.updateMoviesInLocalStorage(movies);
    return of("Successfully updated existing movie!");
  }

  public deleteUser(movieId: string): Observable<any> {
    const movies = this.movies.getValue();
    const index = movies.findIndex(u => u.id === movieId);
    movies.splice(index, 1);
    this.updateMoviesInLocalStorage(movies);
    return of("Successfully deleted");
  }

  private updateMoviesInLocalStorage(movies: any[]): void {
    localStorage.setItem('movies', JSON.stringify(movies));
    this.movies.next(movies);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() {
    const movies = [
      {
        id: '1',
        name: 'Batman',
        photo: 'https://plus.unsplash.com/premium_photo-1672907030852-3eb140df586f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        year_of_release: 2021,
        box_office: 2000000,
        created_at: new Date(2023, 4, 21)
      },
      {
        id: '1',
        name: 'Batman',
        photo: 'https://plus.unsplash.com/premium_photo-1672907030852-3eb140df586f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        year_of_release: 2021,
        box_office: 2000000,
        created_at: new Date(2023, 4, 21)
      },
      {
        id: '1',
        name: 'Batman',
        photo: 'https://plus.unsplash.com/premium_photo-1672907030852-3eb140df586f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        year_of_release: 2021,
        box_office: 2000000,
        created_at: new Date(2023, 4, 21)
      },
      {
        id: '1',
        name: 'Batman',
        photo: 'https://plus.unsplash.com/premium_photo-1672907030852-3eb140df586f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        year_of_release: 2021,
        box_office: 2000000,
        created_at: new Date(2023, 4, 21)
      }

    ]

    let parsed_movies = JSON.stringify(movies);
    localStorage.setItem('movies', parsed_movies);
  }

  get movies(): any {
    return this.movies.asObservable();
  }
}

import {Component, Renderer2} from '@angular/core';
import {MovieService} from "../movie.service";
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css']
})
export class MovieDisplayComponent {
  isListView: boolean = false;
  darkMode: boolean = false;
  searchQuery: string = '';

  constructor(private renderer: Renderer2,
              private movieService: MovieService,
              private notifications: NotificationService) {
  }

  get isDarkMode() {
    let darkMode = localStorage.getItem('darkMode');
    return darkMode === 'true';
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', String(this.darkMode));
    this.changeBodyClass();
  }

  toggleListView() {
    this.isListView = !this.isListView;
    localStorage.setItem('isListView', String(this.isListView));
  }

  ngOnInit() {
    let darkMode: any = localStorage.getItem('darkMode');
    this.darkMode = darkMode === 'true';
    this.changeBodyClass();

    let isListView: any = localStorage.getItem('isListView');
    this.isListView = isListView === 'true';
  }



  // Changes the class of body for dark or light mode respectively
  changeBodyClass() {
    if (this.darkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    }
    else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }

  get movies() {
    /*let movies = JSON.parse(localStorage.getItem('movies') || '[]');
    if (this.searchQuery.trim() !== '') {
      movies = movies.filter((movie: any) => movie.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
    return movies*/
    let allMovies = JSON.parse(localStorage.getItem('movies') || '[]');
    if (!this.searchQuery) {
      // No search query, return all movies
      return allMovies;
    }
    // Filter movies by name
    const query = this.searchQuery.toLowerCase();
    return allMovies.filter((movie) =>
      movie.name.toLowerCase().includes(query)
    );
  }

  deleteMovie(id: string) {
    this.movieService.deleteUser(id).subscribe(data => {
        this.notifications.showSuccess(data)
      },
      error => {
        this.notifications.showError("Errors!")
      })
  }

}

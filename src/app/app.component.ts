import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormControl, ValidatorFn, Validators} from '@angular/forms';
import {MovieService} from "./movie.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'final-project-angular';
  isListView: boolean = false;
  darkMode: boolean = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', String(this.darkMode));
    this.changeBodyClass();
  }

  toggleListView() {
    this.isListView = !this.isListView;
    localStorage.setItem('isListView', String(this.isListView));
  }

  fb = new FormBuilder();

  constructor(movieService: MovieService, private renderer: Renderer2) { }

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

  movieForm = this.fb.group({
    id: [Math.floor(Math.random() * 1000), Validators.required],
    name: ['', Validators.required],
    photo: ['', Validators.required],
    year_of_release: ['', [Validators.required, Validators.pattern('^\\d{4}$')]],
    box_office: ['', Validators.required],
    created_at: [new Date().toISOString()]
  });

  onSubmit(): void {
    // Save form data to localStorage
    let temp: string = localStorage.getItem('movies') || '[]';
    let movies = JSON.parse(temp);
    movies.push(this.movieForm.value);
    localStorage.setItem('movies', JSON.stringify(movies));

    // Reset form after submission
    this.movieForm.reset({
      id: Math.floor(Math.random() * 1000),
      created_at: new Date().toISOString()
    });
  }

  get movies() {
    return JSON.parse(localStorage.getItem('movies') || '[]');
  }

  // Used for validation of the 'year_release' field in FormBuilder
  yearReleaseValidator(): ValidatorFn {
    return (control) => {
      const year = control.value;
      const currentYear = new Date().getFullYear();
      const minYear = 1900; // you can set the minimum year as needed
      const isValid = !isNaN(year) && year >= minYear && year <= currentYear;
      return isValid ? null : { invalidYear: true };
    };
  }

  filmForm = this.fb.group({
    id: new FormControl({value: '', disabled: true}),
    photo: ['', Validators.required],
    name: ['', Validators.required],
    box_office: ['', Validators.required],
    created_at: ['', Validators.required],
  })


  // onPhotoSelect(event: Event) {
  //   // @ts-ignore
  //   let file = (event.target as HTMLInputElement).files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.filmForm.patchValue({
  //         photo: reader.result || ''
  //       });
  //     };
  //   }
  // }

  // usersForm = this.fb.group({
  //   id: new FormControl({value: '', disabled: true}),
  //   name: ['', Validators.required],
  //   year_release: ['', [Validators.required, this.yearReleaseValidator()]],
  //   lastname: ['', Validators.required],
  //   type: [''],
  //   email: ['', [Validators.required, Validators.email]],
  //   password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()]).+$')]],
  //   confirmPassword: ['', [Validators.required]],
  //   subjects: this.fb.array([]),
  //   description: [''],
  //   sex: [''],
  //   phone: ['', [Validators.pattern('^380\\d{9}$')]]
  //   },
  //   {
  //     validators: [this.passwordMatches('password', 'confirmPassword')]
  //   });
}

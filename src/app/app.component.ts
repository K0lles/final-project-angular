import {Component, OnInit, Renderer2} from '@angular/core';
import {ValidatorFn} from '@angular/forms';
import {MovieService} from "./movie.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'final-project-angular';
  darkMode: boolean = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', String(this.darkMode));
    this.changeBodyClass();
  }

  constructor(movieService: MovieService, private renderer: Renderer2) { }

  ngOnInit() {
    let darkMode: any = localStorage.getItem('darkMode');
    this.darkMode = darkMode === 'true';
    this.changeBodyClass();
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

  /*filmForm = this.fb.group({
    id: new FormControl({value: '', disabled: true}),
    photo: ['', Validators.required],
    name: ['', Validators.required],
    box_office: ['', Validators.required],
    created_at: ['', Validators.required],
  })*/


  /*onPhotoSelect(event: Event) {
    // @ts-ignore
    let file = (event.target as HTMLInputElement).files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.filmForm.patchValue({
          photo: reader.result || ''
        });
      };
    }
  }

  usersForm = this.fb.group({
    id: new FormControl({value: '', disabled: true}),
    name: ['', Validators.required],
    year_release: ['', [Validators.required, this.yearReleaseValidator()]],
    lastname: ['', Validators.required],
    type: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()]).+$')]],
    confirmPassword: ['', [Validators.required]],
    subjects: this.fb.array([]),
    description: [''],
    sex: [''],
    phone: ['', [Validators.pattern('^380\\d{9}$')]]
    },
    {
      validators: [this.passwordMatches('password', 'confirmPassword')]
    });*/
}

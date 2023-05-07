import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../movie.service";
import {NotificationService} from "../notification.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css']
})
export class MovieUpdateComponent implements OnInit{
  id: string;
  movie: any;

  fb = new FormBuilder();

  constructor(private route: ActivatedRoute,
              private staticRoute: Router,
              private movieService: MovieService,
              private notifications: NotificationService) {
  }

  movieForm = this.fb.group({
    id: new FormControl({value: '', disabled: true}),
    name: ['', Validators.required],
    // photo: ['', Validators.required] as unknown as FormControl,
    year_of_release: ['', [Validators.required, Validators.pattern('^\\d{4}$')]],
    box_office: ['', Validators.required],
    created_at: [''],
  });

  get movies() {
    return JSON.parse(localStorage.getItem('movies') || '[]');
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    for (let el of this.movies) {
      console.log(el);
      if (el.id === this.id) {
        this.movie = el;
        this.putElementIntoForm(this.movie.id);
      }
    }

    if (this.movie === undefined) {
      this.staticRoute.navigate(['']);
    }
  }

  putElementIntoForm(id: any) {
    this.movieForm.reset();
    this.movieForm.controls['id'].patchValue(this.movie.id);
    this.movieForm.controls['id'].disable({onlySelf: true});
    this.movieForm.controls['name'].patchValue(this.movie.name);
    this.movieForm.controls['year_of_release'].patchValue(this.movie.year_of_release);
    this.movieForm.controls['box_office'].patchValue(this.movie.box_office);
    this.movieForm.setErrors(null);
  }

  onSubmit() {
    if (this.movieForm.valid) {
      let elem: any;
      for (let item of this.movies) {
        if (item.id === this.movieForm.controls['id'].value) {
          elem = item;
        }
      }

      let updating_movie = {
        id: this.movieForm.controls['id'].value,
        name: this.movieForm.controls['name'].value,
        year_of_release: this.movieForm.controls['year_of_release'].value,
        box_office: this.movieForm.controls['box_office'].value
      }
      this.movieService.updateUser(updating_movie).subscribe(data => {
          this.notifications.showSuccess(data);
          this.staticRoute.navigate(['']);
        },
        error => {
          this.notifications.showError("Errors occurred!");
        })
    }
    else {
      this.notifications.showError('Errors have occurred while validating!');
    }
    this.movieForm.reset();
  }

}

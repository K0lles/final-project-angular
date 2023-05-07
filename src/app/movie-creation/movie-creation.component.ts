import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {NotificationService} from "../notification.service";
import {MovieService} from "../movie.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-creation',
  templateUrl: './movie-creation.component.html',
  styleUrls: ['./movie-creation.component.css']
})
export class MovieCreationComponent {

  fb = new FormBuilder();

  constructor(private notifications: NotificationService,
              private movieService: MovieService,
              private staticRoute: Router) {
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

  generateRandomString(): string {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // onFileChange(event: any) {
  //   let file: any = event.target.files[0];
  //   if (file) {
  //     this.movieForm.controls['photo'].setErrors(null);
  //   }
  //   else {
  //     this.movieForm.controls['photo'].setErrors({'required': true});
  //   }
  // }

  onSubmit(): void {

    if (this.movieForm.valid) {
      if (!this.movieForm.controls['id'].value) {
        let new_movie = {
          id: this.generateRandomString(),
          name: this.movieForm.controls['name'].value,
          year_of_release: this.movieForm.controls['year_of_release'].value,
          box_office: this.movieForm.controls['box_office'].value,
          created_at: new Date()
        }
        this.movieService.addMovie(new_movie).subscribe(data => {
            this.notifications.showSuccess(data)
            this.staticRoute.navigate(['']);
          },
          error => {
            this.notifications.showError("Errors occurred!");
          }
        )
      } else {
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
          },
          error => {
            this.notifications.showError("Errors occurred!");
          })
      }
      this.movieForm.reset();
    } else {
      this.notifications.showError('Errors have occurred while validating!');
    }
  }

  displayFormErrors() {
    Object.keys(this.movieForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.movieForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log(`Control: ${key}, Error: ${keyError}, Value: ${controlErrors[keyError]}`);
        });
      }
    });
  }

}

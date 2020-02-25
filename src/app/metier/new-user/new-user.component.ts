import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { map, first } from 'rxjs/operators';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  protected registerForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthenticationService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['',
       [Validators.required, Validators.minLength(4)]
      ],
      username: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
        this.validateUsernameAvailability.bind(this)
      ],
      email: [
        '',
        [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')],
        this.validateEmailNotTaken.bind(this)
      ],
      telephone: [
        '',
        Validators.required
      ],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }

    // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  validateUsernameAvailability(control: AbstractControl) {
    return this.authService.checkUsernameAvailability(control.value).pipe(map(res => {
      return res.available ? null : { usernameTaken: true };
    }));
  }

  validateEmailNotTaken(control: AbstractControl) {
    return this.authService.checkEmailAvailability(control.value).pipe(map(res => {
      return res.available ? null : { emailTaken: true };
    }));
  }

  validateTelephoneNotTaken(control: AbstractControl) {
    return this.authService.checkTelephoneAvailability(control.value).pipe(map (res => {
      return res.available ? null : {telephoneTaken: true};
    }));
  }

  onFormSubmit() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
      data => {
          this.toastr.success('Merci Enregistrement fait avec succès !! Veuillez entrer votre login');
          this.router.navigate(['/signin']);
          this.registerForm.reset();
      },
      error => {
        this.toastrService.error(error || 'Sorry! Something went wrong. Please try again!');
    });
  }

}

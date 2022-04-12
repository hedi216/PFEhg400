import { User, UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.minLength(6),
    Validators.maxLength(128),
  ]);
  fullNameFormControl = new FormControl('', [Validators.required]);
  positionFormControl = new FormControl('', [Validators.required]);
  phoneNumberFormControl = new FormControl('', [Validators.required]);

  updateForm = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl,
    fullName: this.fullNameFormControl,
    position: this.positionFormControl,
    phoneNumber: this.phoneNumberFormControl,
  });

  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.fetchUser(this.route.snapshot.params['email']).subscribe(
      (user: User) => {
        this.emailFormControl.setValue(user.email);
        this.fullNameFormControl.setValue(user.fullName);
        this.positionFormControl.setValue(user.position);
        this.phoneNumberFormControl.setValue(user.phoneNumber);
      },
      () => {
        alert('Error');
      }
    );
  }
  onSubmit() {
    if (this.updateForm.valid) {
      this.usersService
        .updateUser(this.route.snapshot.params['email'], this.updateForm.value)
        .subscribe(
          () => {
            this.router.navigate(['/administrator']);
          },
          () => {
            alert('Error');
          }
        );
    }
  }
  Btn_close() {
    this.router.navigate(['/administrator']);
  }
}

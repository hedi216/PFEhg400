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
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
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

  createForm = new FormGroup({
    email: this.emailFormControl,
    // password: this.passwordFormControl,
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

  ngOnInit(): void {}
  onSubmit() {
    if (this.createForm.valid) {
      this.usersService.createUser(this.createForm.value).subscribe(
        () => {
          this.router.navigate(['/administrator']);
        },
        () => {
          alert('Email deja utilisé');
        }
      );
    }
  }
  Btn_close() {
    this.router.navigate(['/administrator']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UsersService } from 'src/app/services/users.service';

export interface PeriodicElement {
  fullName: string;
  position: string;
  email: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  ap: any;
  displayedColumns: string[] = [
    'user',
    'fullName',
    'position',
    'email',
    'phoneNumber',
    'actions',
  ];
  //dataSource = ELEMENTS_DATA;

  apiUsers: Observable<User[]>;

  constructor(private usersService: UsersService) {
    this.apiUsers = this.usersService.getUsers();
  }

  ngOnInit(): void {}

  deleteUser(email: string) {
    if (confirm('Are your sure you want to delete this user?')) {
      this.usersService.deleteUser(email).subscribe(
        () => {
          this.apiUsers = this.usersService.getUsers();
        },
        () => {
          alert('Error');
        }
      );
    }
  }
  sendUser(email: string) {
    this.usersService.sentMail(email).subscribe(
      () => {
        alert('email send successfully');
      },
      () => {
        alert('email not send');
      }
    );
  }
}

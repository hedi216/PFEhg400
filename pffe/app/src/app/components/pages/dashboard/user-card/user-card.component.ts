import { Component, OnInit } from '@angular/core';
import { AuthService, AuthUser } from 'src/app/services/auth.service';
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  user?: AuthUser;
  constructor(private authService: AuthService) {
    this.user = this.authService.user;
  }

  ngOnInit(): void {}
}

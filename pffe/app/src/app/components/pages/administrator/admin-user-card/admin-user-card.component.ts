import { Component, OnInit } from '@angular/core';
import { AuthService, AuthUser } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-user-card',
  templateUrl: './admin-user-card.component.html',
  styleUrls: ['./admin-user-card.component.css'],
})
export class AdminUserCardComponent implements OnInit {
  user?: AuthUser;
  constructor(private authService: AuthService) {
    this.user = this.authService.user;
  }

  ngOnInit(): void {}
}

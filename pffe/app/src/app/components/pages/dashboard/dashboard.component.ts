import { Component, OnInit } from '@angular/core';
import { AuthService, AuthUser } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  showMe: boolean = false;
  user?: AuthUser;
  constructor(private authService: AuthService) {
    this.user = this.authService.user;
  }

  ngOnInit(): void {}
  logout() {
    this.authService.logout();
  }
  toogletag() {
    this.showMe = !this.showMe;
  }
}
